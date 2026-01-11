import * as JSZip from "jszip";

/**
 * 下载文件并将其添加到zip文件中
 * @param url 下载文件的URL
 * @param zip JSZip对象，用于创建zip文件
 * @returns 添加了下载文件的zip文件
 */
export async function downloadAndZip(url: string, zip: JSZip): Promise<{ zip: JSZip, file_name: string }> {

	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	const fileName = url.replace(/\?.*?$/g, "").split("/").pop();

	// 添加到zip文件
	zip.file(fileName, arrayBuffer);
	return { zip, file_name: fileName };
}