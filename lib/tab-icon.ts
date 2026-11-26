export const DEFAULT_ICON = "/icon.svg";

/** URL Cloudinary dipotong jadi PNG persegi 180px; URL lain dipakai apa adanya. */
export function tabIconUrl(url: string | undefined): string {
  if (!url) return DEFAULT_ICON;
  return url.replace("/upload/f_auto,q_auto/", "/upload/c_fill,g_center,w_180,h_180,f_png/");
}
