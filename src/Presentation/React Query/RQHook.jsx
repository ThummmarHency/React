import { useQuery ,useQueryClient} from "react-query";
import axios from "axios";
const fetchData = (api) => {
  return axios.get(api);
};
export const RQHook = (api) => {
  return useQuery("get", () => fetchData(api), {
    refetchOnMount: false,
    refetchInterval: true,
    enabled: false,
  })
};
const fetchDataId=(api,stuId)=>{
  return axios.get(`${api}${stuId}`);
}
export const RQIndHook=(api,stuId)=>{
  const queryClient=useQueryClient()
  return useQuery(['get',stuId],()=>fetchDataId(api,stuId),{staleTime:30000},
  {initialData:()=>{
    const stu=queryClient.getQueryData('get')?.data?.data?.find(stu=>stu._id===parseInt(stuId))
    if(stu){
      return {
        data:stu
      }
    }
    else{
      return undefined
    }
  } })
}