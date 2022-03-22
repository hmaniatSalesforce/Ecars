import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LETTER_PAGE_WIDTH = 612;
const PATH_PREFIX = __dirname + '/images';

const lookup = {
    price: {},
    range: {
        Short_Range: {
            text: 'Short range',
            image: `${PATH_PREFIX}/Car/Range/200.png`
        },
        Medium_Range: {
            text: 'Standard range',
            image: `${PATH_PREFIX}/Car/Range/250.png`
        },
        Long_Range: {
            text: 'Long range',
            image: `${PATH_PREFIX}/Car/Range/300.png`
        }
    },
    exteriorColor: {
        Pearl_White: {
            text: 'Pearl White',
            image: `${PATH_PREFIX}/Car/Exterior/white.jpg`
        },
        VIP_Black: {
            text: 'VIP Black',
            image: `${PATH_PREFIX}/Car/Exterior/black.jpg`
        },
        Pulsar_Red: {
            text: 'Pulsar Red',
            image: `${PATH_PREFIX}/Car/Exterior/red.jpg`
        },
        Deep_Blue: {
            text: 'Deep Blue',
            image: `${PATH_PREFIX}/Car/Exterior/blue.jpg`
        },
        Modern_Green: {
            text: 'Modern Green',
            image: `${PATH_PREFIX}/Car/Exterior/green.jpg`
        }
    },
    interiorColor: {
        Vegan_Black: {
            text: 'Vegan Black',
            image: `${PATH_PREFIX}/Car/Interior/black.jpg`
        },
        Vegan_White: {
            text: 'Vegan White',
            image: `${PATH_PREFIX}/Car/Interior/white.jpg`
        },
        Vegan_Tan: {
            text: 'Vegan Tan',
            image: `${PATH_PREFIX}/Car/Interior/tan.jpg`
        }
    },
    wheels: {
        Standard: {
            text: 'Standard',
            image: `${PATH_PREFIX}/Car/Wheels/standard.jpg`
        },
        Premium: {
            text: 'Premium',
            image: `${PATH_PREFIX}/Car/Wheels/premium.jpg`
        }
    },
    car: {
        Pearl_White: `${PATH_PREFIX}/Car/white.png`,
        VIP_Black: `${PATH_PREFIX}/Car/black.png`,
        Pulsar_Red: `${PATH_PREFIX}/Car/red.png`,
        Deep_Blue: `${PATH_PREFIX}/Car/blue.png`,
        Modern_Green: `${PATH_PREFIX}/Car/green.png`
    }
};

export function createPdfDefinition(data) {
    const { exteriorColor, interiorColor, range, vin, customerName, leadId } =
        data;

    const pdfDoc = {
        pageSize: 'LETTER',
        pageMargins: 0,
        content: [
            {
                // header
                columns: [
                    {
                        // left side of header: logo
                        image: `${PATH_PREFIX}/PulsarLogo/SmallLogotype.png`,
                        width: 0.25 * LETTER_PAGE_WIDTH
                    },
                    {
                        // right side of header
                        stack: [
                            {
                                // model name
                                text: 'Neutron',
                                alignment: 'right',
                                style: 'modelName'
                            },
                            {
                                // model number and type
                                text: 'LGM-1 SEDAN',
                                alignment: 'right',
                                style: 'capText'
                            }
                        ],
                        width: '*'
                    }
                ],
                margin: [30, 15, 30, 15]
            },
            createDividerLine(),
            {
                // Car image
                image: lookup.car[exteriorColor],
                width: 0.5 * LETTER_PAGE_WIDTH,
                margin: [
                    0.25 * LETTER_PAGE_WIDTH,
                    0,
                    0.25 * LETTER_PAGE_WIDTH,
                    0
                ]
            },
            {
                // Vehicle Allocation title
                text: '\nVEHICLE ALLOCATED\n\n',
                margin: [30, 0, 0, 0],
                style: 'capText'
            },
            {
                // Order confirmation sentence
                text: `Dear ${customerName}, a new vehicle with VIN: ${vin} has been allocated\nto you. Please find the details for your new car below.\n\n`,
                margin: [30, 0, 0, 0],
                width: 0.7 * LETTER_PAGE_WIDTH,
                style: 'sentenceText'
            },
            createCarOptionRow(
                'RANGE',
                lookup.range[range].text,
                lookup.range[range].image
            ),
            createCarOptionRow(
                'EXTERNAL',
                lookup.exteriorColor[exteriorColor].text,
                lookup.exteriorColor[exteriorColor].image
            ),
            createCarOptionRow(
                'WHEELS',
                lookup.wheels.Premium.text,
                lookup.wheels.Premium.image
            ),
            createCarOptionRow(
                'INTERNAL',
                lookup.interiorColor[interiorColor].text,
                lookup.interiorColor[interiorColor].image
            ),
            createDividerLine(),
            {
                // footer
                columns: [
                    {
                        text: 'Pulsar Automotive',
                        width: 0.5 * LETTER_PAGE_WIDTH,
                        alignment: 'left',
                        style: 'footer',
                        bold: true,
                        margin: [30, 33, 0, 0]
                    },
                    {
                        text:
                            new Date().toLocaleDateString('en-US') +
                            '\nReference ID: ' +
                            leadId,
                        width: '*',
                        alignment: 'right',
                        style: 'footer',
                        margin: [0, 33, 60, 0]
                    }
                ]
            }
        ],
        styles: {
            capText: {
                font: 'SalesforceSans',
                fontSize: 9,
                bold: true,
                characterSpacing: 3,
                color: '#718096'
            },
            modelName: {
                font: 'SalesforceSansLight',
                fontSize: 30,
                bold: false,
                characterSpacing: 1,
                color: '#4A5568'
            },
            sentenceText: {
                font: 'SalesforceSans',
                fontSize: 14,
                bold: false,
                color: '#4A5568'
            },
            footer: {
                font: 'SalesforceSans',
                fontSize: 8,
                color: '#AEA0C0'
            }
        }
    };

    return pdfDoc;
}

function createCarOptionRow(title, description, imagePath) {
    return [
        // top border
        createDividerLine(),
        {
            // car option details
            columns: [
                {
                    text: title,
                    width: 0.4 * LETTER_PAGE_WIDTH,
                    alignment: 'left',
                    margin: [30, 33, 0, 0],
                    style: 'capText'
                },
                {
                    text: description,
                    alignment: 'right',
                    width: 0.4 * LETTER_PAGE_WIDTH,
                    margin: [0, 26, 30, 0],
                    style: 'sentenceText'
                },
                {
                    image: imagePath,
                    alignment: 'center',
                    width: 0.12 * LETTER_PAGE_WIDTH
                }
            ]
        }
    ];
}

function createDividerLine() {
    return {
        image: `${PATH_PREFIX}/Line.png`,
        width: LETTER_PAGE_WIDTH - 30,
        height: 1,
        margin: [15, 0, 0, 0]
    };
}
