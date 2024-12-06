import { getJobs } from "@/api/apiJobs.js"
import useFetch from "@/hooks/use-fetch"
import { useEffect } from "react"



const JobListing = () => {

  const {
    loading: loadingJobs,
    data: dataJobs,
    fn: fnJobs,
  } = useFetch(getJobs);
  console.log(dataJobs)
  useEffect(() => {
    fnJobs()
  }, [])
  return (
    <div>JobListing</div>
  )
}

export default JobListing