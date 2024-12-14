type RangeProps = {
    min?: number;
    max?: number;
    range?: number[];
    unit?: string;
};

export function useRange(props: RangeProps) {
    const defaultMax = props.max || 100;
    const defaultMin = props.min || 0;

    const defaultRangeFromMinMaxWhenNotProvided = Array.from(
        { length: defaultMax - defaultMin + 1 },
        (_, i) => i + defaultMin
    );

    const range = props.range || defaultRangeFromMinMaxWhenNotProvided;
    const max = range[range.length - 1];
    const min = range[0];

    return {
        /** Array of available start/end values */
        range,
        /** Minimum value */
        min,
        /** Maximum value */
        max
    };
}
