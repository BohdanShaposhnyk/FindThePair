/**
 * Created by bohdan on 27.11.2017.
 */

import Skins from 'Skins'

const sizes = [5, 8, 10, 12];
const defaultSize = sizes[0];

export default {
    skins : Skins,
    currentSkin : Skins.def,
    sizes : sizes,
    currentSize : defaultSize,
    cards : new Array(defaultSize * 2).fill(null)
};

