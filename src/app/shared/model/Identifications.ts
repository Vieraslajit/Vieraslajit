/* tslint:disable */
/**
 * API documentation
 * To use this api you need an access token. To get the token, send a post request with your email address to api-users resource and one will be send to your. See below for information on how to use this api and if you have any questions you can contact us at helpdesk@laji.fi.  Place refer to [schema.laji.fi](http://schema.laji.fi/) for more information about the used vocabulary
 *
 * OpenAPI spec version: 0.0.1
 *
 *
 * NOTE: TEST This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

export interface Identifications {


    /**
     * Unique ID for the object. (if none given id will be auto generated during insert)
     */
    id?: string;

    /**
     * Write associated taxa names here, separated by a semicolon (;). E.g.: \\\"Betula pendula; Betula pubescens; Poaceae\\\".
     */
    associatedObservationTaxa?: string;

    author?: string;

    /**
     * Name of the identifier (person)
     */
    det?: string;

    detDate?: string;

    detVerbatim?: string;

    genusQualifier?: string;

    identificationDate?: string;

    identificationNotes?: string;

    infraAuthor?: string;

    infraEpithet?: string;

    infraRank?: string;

    infrasubspecificSubdivision?: string;

    /**
     * This can be used to select one of the identifications as 'recommended', which is the used as default when displaying information about the specimen.
     */
    preferredIdentification?: string;

    /**
     * PUBLIC: all data can be published; PROTECTED: exact locality is hidden; PRIVATE: most of the data is hidden. If blank means same as public
     */
    publicityRestrictions?: string;

    /**
     * Publication reference for the taxon concept, that was used in identification
     */
    sec?: string;

    sortOrder?: number;

    speciesQualifier?: string;

    taxon?: string;

    taxonID?: string;

    taxonRank?: string;

    /**
     * Taxon name in original format (e.g. from the label), errors and all
     */
    taxonVerbatim?: string;
}