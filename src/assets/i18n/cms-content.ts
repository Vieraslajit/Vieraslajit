export enum StaticContent {
    EUList, FIList
}

export function findContentID(target: StaticContent, lang: string) {
    let r: string = "";
    switch(target) {
        case StaticContent.EUList:
            if (lang== "fi") r = "i-113";
            if (lang== "en") r = "i-117";
            if (lang== "sv") r = "i-121";
            break;
        case StaticContent.FIList:
            if (lang== "fi") r = "i-115";
            if (lang== "en") r = "i-119";
            if (lang== "sv") r = "i-124";
            break;
    }
    return r;
}