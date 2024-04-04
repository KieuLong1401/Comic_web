import axiosInstance from "@/utils/axiosInstance";

export default async(comicId: string) => {
    try {
        const result = await axiosInstance({
            url: `comic/${comicId}`,
            method: 'GET',
        })

        return result
    } catch(err) {
        console.log(err)
    }
}