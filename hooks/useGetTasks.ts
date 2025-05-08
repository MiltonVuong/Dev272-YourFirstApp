export const useGetTasks = () => {
    return useQuery( {
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data, error } = await supabase
            .from
        }
    )
}