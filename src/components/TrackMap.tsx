import { decode } from "@googlemaps/polyline-codec";
import { FunctionComponent } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { boundsFromLatLngArray } from "../helpers/boundsFromLatLngArray";

export const TrackMap: FunctionComponent = () => {
    const [searchParams] = useSearchParams();
    let compressedTrack = 'qeaeH_pgeAiB}AKBO?n@FrAfBMBQYS?OLWFSPu@xAARb@~@OLEJ@Fj@r@j@dATTTj@FFJZl@bAz@fA|@`Aj@|@h@j@DLD?Tf@jBbCr@jADVXVv@~AJHZh@Vj@bA~@Vt@l@bAL\\n@NRPj@h@`@LPVPlAn@z@`A?RXTPBRh@FDhAj@n@BXPH@DI`@RV?TT^jAd@hBJp@^hA@TTbAQjA?LO~ABl@Jx@PZAHJTh@|@Rl@?PDJVLLZRTFVl@r@NZPPDLHB~@lANLp@lAtAhBhApBRn@^n@Tn@j@Tt@dAXTr@XFJn@j@l@Dh@\\jAAjANPP?LFFVLDL^^N`@Z\\FRVV\\f@NFRC\\R`DzB^^HRH`@AJ`AhCBb@HD?HHH?NHN?r@LVCLBRNTA\\Fr@Lj@?PJh@AJbAbDD|@{@yBBVKrAB`@EREEPn@@l@I^Cn@DTAXQXEl@CrAB`@EVBVU|@Ab@GX?p@OR?VIZD`@ERGFDxAATG^Aj@@SRX?EDJHDf@pYCr@Gb@S`@Ft@BHLBJJBJ@\\DFz@Hb@]NRF@~@c@P@lCs@j@ABEdAQNKv@KhA_@b@ZDX@~AHXJJjAEb@BLHl@z@Td@F^NAT[UNERE`A@t@FLPRZNd@HDEE?IlDKh@a@bFMz@CbBIr@@PUlADb@CFBjACTDx@CRBJETBj@ExAD\\@XFXHHCx@D`@GX\\hDTHtAIbCEjADRIn@?r@Wv@EXF\\Cd@NjBVrBFtARbAFNEp@NfADJP?r@Dp@BLCxBDBC\\Dj@Al@?rA@TEDDHEv@@HpD\\l@BbCZpBD\\x@b@x@|ApBf@j@JALYTCJi@FGFVRVtAnAoAeAtAl@lDtBMEGQ?E\\j@B?@LIv@EJK|AuArEUjAWx@Cj@OhAGJCd@MVc@zBIR]xAW`BKTWjA@NYlAEZBh@KV@VEFKj@@N[lA?LKf@OXGf@@JGV?LI`ABJIrDRlETtBNp@AHLbAJZHn@N^LDFJTdA@VTlALXLF^j@J^l@lAj@bBnA`BLFtA|BC\\Wv@UdAI~@GLQtA@VIZD^OjAErAMfA?v@Sz@?n@OlA?ZEBCJCl@MVGXA|@Id@@HTV`@IFHf@JDFSxABlACXFlACx@B|@CH^A@Fx@XVKXHNIJa@CXCUAHH@GF@C'
    if (searchParams.has('track')) {
        const trackData = searchParams.get('track');
        if (trackData) {
            compressedTrack = trackData;
        }
    }

    let width = 300;
    if (searchParams.has('width')) {
        const widthParam = Number(searchParams.get('width'))
        if (widthParam) {
            width = widthParam
        }
    }

    let height = 300;
    if (searchParams.has('height')) {
        const heightParam = Number(searchParams.get('height'))
        if (heightParam) {
            height = heightParam
        }
    }

    const trackPoints = decode(compressedTrack, 5);

    const bounds = boundsFromLatLngArray(trackPoints);

    return (
        <div style={{ width: width, height: height }}>
            <MapContainer zoomControl={false} style={{ width: '100%', height: '100%'}}
                doubleClickZoom={false} dragging={false}
                scrollWheelZoom={false} touchZoom={false}
                attributionControl={false} bounds={bounds}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                <Polyline positions={trackPoints} />
            </MapContainer>

        </div>
    )
}