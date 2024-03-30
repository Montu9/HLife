import allowedOrigins from "./allowedOrigin";

type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>;

type CustomOrigin = (
    requestOrigin: string | undefined,
    callback: (err: Error | null, origin?: StaticOrigin) => void
) => void;

const corsOptions: { origin: CustomOrigin; credentials: boolean } = {
    origin: (requestOrigin, callback) => {
        if (
            (typeof requestOrigin === "string" && allowedOrigins.indexOf(requestOrigin) !== -1) ||
            !requestOrigin
        ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

export default corsOptions;
