import axiosInstance from "@/utils/axiosInstance"

export default async(data) => {
    try {
        const result = await axiosInstance({
            url: '/signup',
            method: 'POST',
            data,
        })
        return result
    } catch(err) {
        console.error(err)
    }
}