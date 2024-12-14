import { useState, useRef, useEffect } from 'react';

type Handler = 'start' | 'end';

export function useSlider(props: {
    range: number[];
    isGivenRange: boolean;
    min: number;
    max: number;
    updateStart: (value: number) => void;
    updateEnd: (value: number) => void;
}) {
    const { range, min, max, updateStart, updateEnd } = props;
    const [dragging, setDragging] = useState<Handler | null>(null);
    const [lastDragged, setLastDragged] = useState<Handler>();

    const startX = useRef(0);
    const endX = useRef(0);

    const $startHandler = useRef<HTMLButtonElement>(null);
    const $endHandler = useRef<HTMLButtonElement>(null);
    const $bar = useRef<HTMLDivElement>(null);

    /** Calculate point position when determined by min and max */
    function calcPointsForMinAndMax() {
        const points = Array.from({ length: range.length }).map((_, index) => {
            if (!$bar.current) return { x: 0 };
            const bar = $bar.current.getBoundingClientRect();
            return { x: index * (bar.width / range.length) };
        });
        return points;
    }

    /** Calculate point position when determined by range */
    function calcPointsForRange() {
        const points = range.map((point) => {
            if (!$bar.current) return { x: 0 };
            const bar = $bar.current.getBoundingClientRect();
            return { x: point * ((bar.width + 2) / max) };
        });

        return points;
    }

    const points = props.isGivenRange ? calcPointsForRange() : calcPointsForMinAndMax();

    /** Handles start dragging, updating start/end values */
    const handleDrag = (e: TouchEvent | MouseEvent) => {
        if (!dragging || !$bar.current || !$startHandler.current || !$endHandler.current) return;
        // Get the cursor position from the event type
        const cursorX = 'touches' in e ? e.touches[0].clientX : e.clientX;

        // Get the cursor position relative to the range
        const x = cursorX - $bar.current.getBoundingClientRect().left;

        // Find the closest point to the cursor
        const nextIndex = points.findIndex((point) => point.x >= x);
        const prevIndex = points.findIndex((point) => point.x <= x);
        const nextPointIndex = nextIndex === -1 ? max : nextIndex;
        const prevPointIndex = prevIndex === -1 ? min : nextIndex;

        const index = Math.abs(nextPointIndex - prevPointIndex) < 0 ? prevPointIndex : nextPointIndex;

        if (dragging === 'start') {
            const direction = (x > startX.current && 1) || (x < startX.current && -1) || 0;
            startX.current = x;

            if (direction === 0) return;

            const value = range[index];
            updateStart(value);
        }

        if (dragging === 'end') {
            const direction = (x > endX.current && 1) || (x < endX.current && -1) || 0;
            endX.current = x;

            if (direction === 0) return;

            const value = range[index];
            updateEnd(value);
        }
    };

    /** Handles the drop event, setting dragging to null */
    const handleDrop = () => {
        setDragging(null);
        startX.current = 0;
        endX.current = 0;
    };

    useEffect(() => {
        if (dragging === null) return;
        setLastDragged(dragging);
    }, [dragging]);

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDrop);
            document.addEventListener('touchmove', handleDrag);
            document.addEventListener('touchend', handleDrop);
        } else {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDrop);
            document.removeEventListener('touchmove', handleDrag);
            document.removeEventListener('touchend', handleDrop);
        }

        return () => {
            document.removeEventListener('touchmove', handleDrag);
            document.removeEventListener('touchend', handleDrop);
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDrop);
        };
    }, [dragging]);

    return {
        /** Start range handler Ref */
        $startHandler,
        /** End range handler Ref */
        $endHandler,
        /** Slider bar ref */
        $bar,
        /** Dragging state */
        dragging,
        /** sets Dragging state */
        setDragging,
        /** Last dragged handler */
        lastDragged,
        /** Points position */
        points
    };
}
