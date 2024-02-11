export function qrDecToZoi(qrDec: string) {
    console.log(qrDec)
    // take the first 39 characters of the qrDec string
    const first39 = qrDec.slice(0, 39);
    let dec = BigInt(first39);
    let hex = dec.toString(16);

    return hex;    
}