import { useQuery ,useQueryClient} from "react-query";
import axios from "axios";
const fetchData = (api, getToken) => {
  return axios.get(api, {
    headers: { "access-token": `${getToken}` },
  });
};
export const RQHook = (api, getToken) => {
  return useQuery("get", () => fetchData(api, getToken), {
    cacheTime: 3000,
    refetchOnMount: false,
    refetchInterval: true,
    enabled: false,
  })
};
const fetchDataId=(api, getToken,stuId)=>{
  return axios.get(`${api}${stuId}`, {
    headers: { "access-token": `${getToken}` },
  });
}
export const RQIndHook=(api, getToken,stuId)=>{
  const queryClient=useQueryClient()
  return useQuery(['get',stuId],()=>fetchDataId(api, getToken,stuId),{staleTime:30000},
  {initialData:()=>{
    const stu=queryClient.getQueryData('get')?.data?.find(stu=>stu._id===parseInt(stuId))

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