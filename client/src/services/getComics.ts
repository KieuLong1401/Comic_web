import instance from '@/utils/axiosInstance'

const getComics = async ({
    categories = [],
    sort_by = 'uploaded_time',
    sort_type = 'desc',
    page_comic_num = 36,
    page,
}: {
    categories?: string[]
    sort_by?: string
    sort_type?: string
    page_comic_num?: number
    page: number
}) => {
    try {
        const result = await instance({
            url: 'comicList',
            method: 'GET',
            params: {
                categories: JSON.stringify(categories),
                sort_by,
                sort_type,
                page_comic_num,
                page,
            },
        })
        return result
    } catch (err) {
        console.error(err)
    }
}

export default getComics
