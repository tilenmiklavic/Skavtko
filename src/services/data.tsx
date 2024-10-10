export function hasVod(data: any): boolean {
    return data.some((el: any) => el.hasOwnProperty('vod'));
}