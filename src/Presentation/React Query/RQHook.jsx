import { useQuery ,useQueryClient} from "react-query";
import axios from "axios";
const fetchData = (api) => {
  return axios.get(api);
};
export const RQHook = (api) => {
  return useQuery("get", () => fetchData(api), {
    // enabled: false,
    // cacheTime:3000
    // staleTime:5000,
    // refetchInterval:2000
    // refetchOnWindowFocus:false
    // retry: 5,
    // retryDelay: 5000
  })

};
const fetchDataId=(api,stuId)=>{
  return axios.get(`${api}${stuId}`);
}
export const RQIndHook=(api,stuId)=>{
  const queryClient=useQueryClient()
  return useQuery(['get',stuId],()=>fetchDataId(api,stuId),{cacheTime:3000},
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