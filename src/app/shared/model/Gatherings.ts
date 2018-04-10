
import * as models from './index';

export interface Gatherings {

    /**
     * AFE grid name
     */
    aFEQuadrat?: string;

    /**
     * UTM grid name
     */
    uTMQuadrat?: string;

    /**
     * Separate multiple names with commas, from generic to specific. (E.g. EtelÃ¤-Suomen lÃ¤Ã¤ni, Uusimaa)
     */
    administrativeProvince?: string;

    /**
     * Altitude form sea level in meters, or range (E.g. 90, or 80-100). No GPS altitude here.
     */
    alt?: string;

    areaDetail?: string;

    /**
     * Write associated taxa names here, separated by a semicolon (;). E.g.: \\\"Betula pendula; Betula pubescens; Poaceae\\\".
     */
    associatedObservationTaxa?: string;

    associatedSpecimenTaxa?: string;

    /**
     * Formal abbreviation. For Finnish eliÃ¶maakunnat, use Finnish abbreviation.
     */
    biologicalProvince?: string;

    /**
     * Name of an expedition or such
     */
    collectingEventName?: string;

    controlActivitiesNotes?: string;

    /**
     * Informal notes about the coordinates
     */
    coordinateNotes?: string;

    /**
     * Maximum error of coordinates in meters
     */
    coordinateRadius?: string;

    /**
     * Use for NEW SPECIMENS: Where the coordinates have been acquired
     */
    coordinateSource?: Gatherings.CoordinateSourceEnum;

    /**
     * Examples of different coordinate styles are at https://wiki.helsinki.fi/display/digit/Entering+specimen+data
     */
    coordinateSystem?: Gatherings.CoordinateSystemEnum;

    coordinatesGridYKJ?: string;

    coordinatesVerbatim?: string;

    /**
     * Country name in English, or 2-letter country code, or name from label
     */
    country?: string;

    /**
     * County (piirikunta, kreivikunta etc.)
     */
    county?: string;

    dateBegin?: string;

    dateEnd?: string;

    /**
     * Date just as it appears on the label or other original source, no interpretation, errors and all
     */
    dateVerbatim?: string;

    /**
     * Depth in meters, or range (E.g. 0.9, or 0.8-1.0)
     */
    depth?: string;

    dynamicProperties?: string;

    eventDate?: string;

    forestVegetationZone?: Gatherings.ForestVegetationZoneEnum;

    /**
     * instance of gatheringFact
     */
    gatheringFact?: models.GatheringFact;

    /**
     * Geological information about gathering
     */
    geometry?: models.Geometry;

    /**
     * Use for OLD SPECIMENS: What source was used to get coordinates from locality name
     */
    georeferenceSource?: Gatherings.GeoreferenceSourceEnum;

    habitat?: Array<string>;

    habitatAttributes?: Array<string>;

    /**
     * Formal habitat name or abbreviation. If several, separate with semicolons (E.g. 'OMT; OMaT')
     */
    habitatClassification?: string;

    /**
     * Informal description of the habitat
     */
    habitatDescription?: string;

    /**
     * If country is not known or not applicable, for example continent, ocean or large island
     */
    higherGeography?: string;

    /**
     * Unique ID for the object. This will be automatically generated.
     */
    id?: string;

    /**
     * QName for MM.image
     */
    images?: Array<string>;

    invasiveControlEffectiveness?: Gatherings.InvasiveControlEffectivenessEnum;

    /**
     * QName for MX.taxon
     */
    invasiveControlTaxon?: Array<string>;

    keywords?: Array<string>;

    /**
     * Latitude. For southern latitudes, use negative value.
     */
    latitude?: string;

    leg?: Array<string>;

    /**
     * AlkuperÃ¤islÃ¤hteen kÃ¤yttÃ¤jÃ¤tunnus
     */
    legUserID?: Array<string>;

    /**
     * Leg just as it appears in the label or other original source, no interpretation, errors and all
     */
    legVerbatim?: string;

    /**
     * Official name of the locality. Separate multiple names with commas, from generic to specific. No informal description here!
     */
    locality?: string;

    /**
     * Informal description of the exact locality, e.g. '5 km NE of city X, under stone bridge'
     */
    localityDescription?: string;

    /**
     * An unique identifier or code for the locality, if the locality has one (e.g. from SAPO-ontology)
     */
    localityID?: string;

    /**
     * Locality word-to-word as it appears on the label or other original source, errors and all
     */
    localityVerbatim?: string;

    /**
     * Longitude. For western longitudes, use negative value.
     */
    longitude?: string;

    /**
     * Municipality, commune, town, city or civil parish
     */
    municipality?: string;

    /**
     * QName for MNP.namedPlace
     */
    namedPlaceID?: string;

    /**
     * Free-text notes
     */
    notes?: string;

    observationDays?: number;

    observationMinutes?: number;

    predominantTree?: Gatherings.PredominantTreeEnum;

    projectTitle?: string;

    province?: string;

    /**
     * PUBLIC: all data can be published; PROTECTED: exact locality is hidden; PRIVATE: most of the data is hidden.
     * If blank means same as public
     */
    publicityRestrictions?: Gatherings.PublicityRestrictionsEnum;

    samplingMethod?: Gatherings.SamplingMethodEnum;

    samplingMethodNotes?: string;

    skipped?: boolean;

    substrate?: string;

    /**
     * Array of taxonCensus
     */
    taxonCensus?: Array<models.TaxonCensus>;

    temperature?: number;

    timeEnd?: string;

    timeStart?: string;

    trapCount?: number;

    /**
     * Array of units
     */
    units?: Array<models.Units>;

    weather?: string;

    /**
     * Geological information about gathering in wgs84 format
     */
    wgs84Geometry?: models.Geometry;

    wgs84Latitude?: string;

    wgs84Longitude?: string;

}
export namespace Gatherings {
    export enum CoordinateSourceEnum {
        CoordinateSourceGps = <any>'MY.coordinateSourceGps',
        CoordinateSourcePeruskartta = <any>'MY.coordinateSourcePeruskartta',
        CoordinateSourcePapermap = <any>'MY.coordinateSourcePapermap',
        CoordinateSourceKotkamap = <any>'MY.coordinateSourceKotkamap',
        CoordinateSourceKarttapaikka = <any>'MY.coordinateSourceKarttapaikka',
        CoordinateSourceRetkikartta = <any>'MY.coordinateSourceRetkikartta',
        CoordinateSourceOther = <any>'MY.coordinateSourceOther',
        CoordinateSourceUnknown = <any>'MY.coordinateSourceUnknown'
    }
    export enum CoordinateSystemEnum {
        CoordinateSystemYkj = <any>'MY.coordinateSystemYkj',
        CoordinateSystemWgs84 = <any>'MY.coordinateSystemWgs84',
        CoordinateSystemWgs84dms = <any>'MY.coordinateSystemWgs84dms',
        CoordinateSystemKkj = <any>'MY.coordinateSystemKkj',
        CoordinateSystemEtrsTm35fin = <any>'MY.coordinateSystemEtrs-tm35fin',
        CoordinateSystemDd = <any>'MY.coordinateSystemDd',
        CoordinateSystemDms = <any>'MY.coordinateSystemDms'
    }
    export enum ForestVegetationZoneEnum {
        ForestVegetationZone1a = <any>'MY.forestVegetationZone1a',
        ForestVegetationZone1b = <any>'MY.forestVegetationZone1b',
        ForestVegetationZone2a = <any>'MY.forestVegetationZone2a',
        ForestVegetationZone2b = <any>'MY.forestVegetationZone2b',
        ForestVegetationZone3a = <any>'MY.forestVegetationZone3a',
        ForestVegetationZone3b = <any>'MY.forestVegetationZone3b',
        ForestVegetationZone3c = <any>'MY.forestVegetationZone3c',
        ForestVegetationZone4a = <any>'MY.forestVegetationZone4a',
        ForestVegetationZone4b = <any>'MY.forestVegetationZone4b',
        ForestVegetationZone4c = <any>'MY.forestVegetationZone4c',
        ForestVegetationZone4d = <any>'MY.forestVegetationZone4d'
    }
    export enum GeoreferenceSourceEnum {
        GeoreferenceSourceKotka = <any>'MY.georeferenceSourceKotka',
        GeoreferenceSourceKarttapaikka = <any>'MY.georeferenceSourceKarttapaikka',
        GeoreferenceSourcePaikkatietoikkuna = <any>'MY.georeferenceSourcePaikkatietoikkuna',
        GeoreferenceSourceKarjalankartat = <any>'MY.georeferenceSourceKarjalankartat',
        GeoreferenceSourceRetkikartta = <any>'MY.georeferenceSourceRetkikartta',
        GeoreferenceSourceGoogle = <any>'MY.georeferenceSourceGoogle',
        GeoreferenceSourcePeruskartta = <any>'MY.georeferenceSourcePeruskartta',
        GeoreferenceSourcePapermap = <any>'MY.georeferenceSourcePapermap',
        GeoreferenceSourceOtherpaper = <any>'MY.georeferenceSourceOtherpaper',
        GeoreferenceSourceOtherweb = <any>'MY.georeferenceSourceOtherweb',
        GeoreferenceSourceCatalogue = <any>'MY.georeferenceSourceCatalogue',
        GeoreferenceSourceBiogeomancer = <any>'MY.georeferenceSourceBiogeomancer',
        GeoreferenceSourceGeolocate = <any>'MY.georeferenceSourceGeolocate',
        GeoreferenceSourceOther = <any>'MY.georeferenceSourceOther',
        GeoreferenceSourceUnknown = <any>'MY.georeferenceSourceUnknown'
    }
    export enum InvasiveControlEffectivenessEnum {
        InvasiveControlEffectivenessFull = <any>'MY.invasiveControlEffectivenessFull',
        InvasiveControlEffectivenessPartial = <any>'MY.invasiveControlEffectivenessPartial',
        InvasiveControlEffectivenessNone = <any>'MY.invasiveControlEffectivenessNone',
        InvasiveControlEffectivenessNotFound = <any>'MY.invasiveControlEffectivenessNotFound'
    }
    export enum PredominantTreeEnum {
        _37819 = <any>'MX.37819',
        _37812 = <any>'MX.37812',
        _37992 = <any>'MX.37992',
        _38004 = <any>'MX.38004',
        _38590 = <any>'MX.38590',
        _38686 = <any>'MX.38686',
        _38563 = <any>'MX.38563',
        _38527 = <any>'MX.38527',
        _41344 = <any>'MX.41344',
        _38016 = <any>'MX.38016',
        _39331 = <any>'MX.39331',
        _37990 = <any>'MX.37990',
        _38008 = <any>'MX.38008',
        _38010 = <any>'MX.38010',
        _37975 = <any>'MX.37975',
        _37976 = <any>'MX.37976',
        _39122 = <any>'MX.39122'
    }
    export enum PublicityRestrictionsEnum {
        PublicityRestrictionsPublic = <any>'MZ.publicityRestrictionsPublic',
        PublicityRestrictionsProtected = <any>'MZ.publicityRestrictionsProtected',
        PublicityRestrictionsPrivate = <any>'MZ.publicityRestrictionsPrivate'
    }
    export enum SamplingMethodEnum {
        SamplingMethodLight = <any>'MY.samplingMethodLight',
        SamplingMethodPitfall = <any>'MY.samplingMethodPitfall',
        SamplingMethodNet = <any>'MY.samplingMethodNet',
        SamplingMethodMalaise = <any>'MY.samplingMethodMalaise',
        SamplingMethodSoilsample = <any>'MY.samplingMethodSoilsample',
        SamplingMethodSweeping = <any>'MY.samplingMethodSweeping',
        SamplingMethodBait = <any>'MY.samplingMethodBait',
        SamplingMethodBaittrap = <any>'MY.samplingMethodBaittrap',
        SamplingMethodFeromonetrap = <any>'MY.samplingMethodFeromonetrap',
        SamplingMethodWindowtrap = <any>'MY.samplingMethodWindowtrap',
        SamplingMethodPantrap = <any>'MY.samplingMethodPantrap',
        SamplingMethodYellowpan = <any>'MY.samplingMethodYellowpan',
        SamplingMethodYellowWindowTrap = <any>'MY.samplingMethodYellowWindowTrap',
        SamplingMethodYellowtrap = <any>'MY.samplingMethodYellowtrap',
        SamplingMethodTrap = <any>'MY.samplingMethodTrap',
        SamplingMethodLightTrap = <any>'MY.samplingMethodLightTrap',
        SamplingMethodMistnet = <any>'MY.samplingMethodMistnet',
        SamplingMethodHand = <any>'MY.samplingMethodHand',
        SamplingMethodCarnet = <any>'MY.samplingMethodCarnet',
        SamplingMethodDropping = <any>'MY.samplingMethodDropping',
        SamplingMethodExovo = <any>'MY.samplingMethodExovo',
        SamplingMethodElarva = <any>'MY.samplingMethodElarva',
        SamplingMethodEpupa = <any>'MY.samplingMethodEpupa',
        SamplingMethodReared = <any>'MY.samplingMethodReared',
        SamplingMethodEclectortrap = <any>'MY.samplingMethodEclectortrap',
        SamplingMethodSifting = <any>'MY.samplingMethodSifting',
        SamplingMethodBoard = <any>'MY.samplingMethodBoard',
        SamplingMethodDrag = <any>'MY.samplingMethodDrag',
        SamplingMethodTriangleDrag = <any>'MY.samplingMethodTriangleDrag',
        SamplingMethodFishNet = <any>'MY.samplingMethodFishNet',
        SamplingMethodElectrofishing = <any>'MY.samplingMethodElectrofishing',
        SamplingMethodAngleFishing = <any>'MY.samplingMethodAngleFishing',
        SamplingMethodFishTrap = <any>'MY.samplingMethodFishTrap',
        SamplingMethodSeine = <any>'MY.samplingMethodSeine',
        SamplingMethodTrawling = <any>'MY.samplingMethodTrawling',
        SamplingMethodOther = <any>'MY.samplingMethodOther',
        SamplingMethodDiving = <any>'MY.samplingMethodDiving',
        SamplingMethodBeamTrawl = <any>'MY.samplingMethodBeamTrawl',
        SamplingMethodDigging = <any>'MY.samplingMethodDigging',
        SamplingMethodWashing = <any>'MY.samplingMethodWashing'
    }
}
