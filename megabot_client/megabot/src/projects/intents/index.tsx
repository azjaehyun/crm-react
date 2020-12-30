export const DIC_ENTITY_COLOR = [
    'pink',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
    'salmon',
];

export const DEFAULT_COLOR = '#f0f2f5';

export const randomColor = (existMapColor: Map<any, any>) => {
    const existColorList = Array.from(existMapColor.values());
    for (let color of DIC_ENTITY_COLOR) {
        if (existColorList.indexOf(color) === -1) {
            return color;
        }
    }
    return DEFAULT_COLOR;
};

/**
 * reformat intent data, add sampleCount and slots field
 * @param intentList
 */
export const setAnnotationColor = (intentList: any) => {
    // color for each slot
    let mapColor = new Map();

    intentList.forEach((intent: any) => {
        // add default value
        intent.slots = [];
        intent.sampleCount = 0;

        if (intent.sentences) {
            intent.sampleCount = intent.sentences.length;

            let mapSlot = new Map();

            // loop sentences
            for (let sentence of intent.sentences) {
                if (sentence.annotations) {
                    // loop annotations
                    for (let anno of sentence.annotations) {
                        if (anno.type) {
                            // set annotation color
                            if (!mapColor.has(anno.type)) {
                                mapColor.set(anno.type, DIC_ENTITY_COLOR[mapColor.size]);
                            }
                            const color = mapColor.get(anno.type);
                            anno.color = color;

                            let slot = '@' + anno.type;
                            if (!mapSlot.has(slot)) {
                                mapSlot.set(slot, {
                                    name: slot,
                                    color: color,
                                });
                            }
                        }
                    }
                }
            }

            intent.slots = Array.from(mapSlot.values());
        }
    });
    return {
        intents: intentList,
        mapColor: mapColor,
    };
};
