export enum StaticContent {
    EUList, FIList, EradicationInfo, EradicationGuides, Pets
}

export function findContentID(target: StaticContent, lang: string) {
    let r: string = "";
    switch (target) {
        case StaticContent.EUList:
            if (lang == "fi") r = "i-113";
            if (lang == "en") r = "i-117";
            if (lang == "sv") r = "i-121";
            break;
        case StaticContent.FIList:
            if (lang == "fi") r = "i-115";
            if (lang == "en") r = "i-119";
            if (lang == "sv") r = "i-124";
            break;
        case StaticContent.EradicationInfo:
            if (lang == "fi") r = "i-237";
            if (lang == "en") r = "i-244";
            if (lang == "sv") r = "i-246";
            break;
        case StaticContent.EradicationGuides:
            if (lang == "fi") r = "i-239";
            if (lang == "en") r = "i-255";
            if (lang == "sv") r = "i-252";
            break;
        case StaticContent.Pets:
        if (lang == "fi") r = "i-229";
        if (lang == "en") r = "i-259";
        if (lang == "sv") r = "i-256";
        break;    
    }
    return r;
}