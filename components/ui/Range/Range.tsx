'use client';

import { forwardRef, useEffect, useState } from 'react';
import S from './Range.module.css';
import { useSlider } from './hooks/useSlider';
import { useRange } from './hooks/useRange';

export interface RangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    start?: number;
    end?: number;

    min?: number;
    max?: number;
    range?: number[];
    unit?: string;
    onChange?: (values: { start: number; end: number }) => void;
}

const Range = forwardRef<HTMLDivElement, RangeProps>((props, ref) => {
    const { range, max, min } = useRange(props);

    const [start, setStart] = useState(props.start || min);
    const [end, setEnd] = useState(props.start || max);

    const emitOnChange = () => {
        props.onChange?.({ start, end });
    };

    const updateStart = (value: number) => {
        if (value < min) return setStart(min);
        if (value > end) return setStart(end);
        setStart((prev) => value ?? prev);
    };

    const updateEnd = (value: number) => {
        if (value > max) return setEnd(max);
        if (value < start) return setEnd(start);
        setEnd((prev) => value ?? prev);
    };

    const slider = useSlider({
        range,
        isGivenRange: !!props.range,
        min,
        max,
        updateStart,
        updateEnd,
        emitOnChange
    });

    useEffect(() => {
        setStart(props.start || min);
    }, [props.start]);

    useEffect(() => {
        setEnd(props.end || max);
    }, [props.end]);

    // Show points only when dragging and points are less than 30
    const showPoints = slider.points.length <= 30 && slider.dragging;
    return (
        <div
            {...(props as React.HTMLAttributes<HTMLDivElement>)}
            role="slider"
            className={`${S.container} ${props.className || ''}`}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={start}
            aria-valuetext={`${start} - ${end}`}
        >
            <div className={S.inputContainer}>
                <input
                    aria-label="start"
                    value={start}
                    onChange={({ target }) => {
                        updateStart(parseFloat(target.value));
                        setTimeout(emitOnChange, 0);
                    }}
                    className={`${S.input} ${slider.dragging === 'start' ? S.inputActive : ''}`}
                    type="number"
                    style={{ width: start.toString().replace('.', '').length * 14 }}
                    min={min}
                    max={end}
                    disabled={!!props.range}
                />
                <div className={S.unit}>{props.unit}</div>
            </div>

            <div className={S.inputContainer}>
                <input
                    aria-label="end"
                    value={end}
                    onChange={({ target }) => {
                        updateEnd(parseFloat(target.value));
                        setTimeout(emitOnChange, 0);
                    }}
                    className={`${S.input} ${slider.dragging === 'end' ? S.inputActive : ''}`}
                    type="number"
                    style={{ width: end.toString().replace('.', '').length * 14 }}
                    min={start}
                    max={max}
                    disabled={!!props.range}
                />
                <div className={S.unit}>{props.unit}</div>
            </div>

            <div className={S.bar} ref={slider.$bar} data-testid="bar">
                <div className={`${S.line} ${S.lineShadow}`} />
                <div
                    className={`${S.line} ${S.lineRange}`}
                    style={{
                        left: `${((start - min) / (max - min)) * 100}%`,
                        width: `${((end - start) / (max - min)) * 100}%`
                    }}
                />
                {showPoints &&
                    slider.points.map((point, i) => {
                        return <div key={i} className={S.point} style={{ left: `${point.x}px` }} />;
                    })}
                <button
                    data-testid="start-handler"
                    className={`${S.handler} ${slider.dragging === 'start' ? S.handlerActive : ''}`}
                    ref={slider.$startHandler}
                    style={{
                        left: `${((start - min) / (max - min)) * 100}%`,
                        zIndex: slider.lastDragged === 'start' ? 1 : 0
                    }}
                    onTouchStart={() => slider.setDragging('start')}
                    onMouseDown={() => slider.setDragging('start')}
                />
                <button
                    data-testid="end-handler"
                    className={`${S.handler} ${slider.dragging === 'end' ? S.handlerActive : ''}`}
                    ref={slider.$endHandler}
                    style={{
                        left: `${((end - min) / (max - min)) * 100}%`,
                        zIndex: slider.lastDragged === 'end' ? 1 : 0
                    }}
                    onTouchStart={() => slider.setDragging('end')}
                    onMouseDown={() => slider.setDragging('end')}
                />
            </div>
        </div>
    );
});

export default Range;
