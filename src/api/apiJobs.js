import supabaseClient from "@/utils/supabase";

export async function getJobs(token, {location, company_id, searchQuery}) {
    const supabase = await supabaseClient(token);

    let query = supabase.from('jobs').select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

    if (location) {
        query = query.eq('location', location);
    }
    if (company_id) {
        query = query.eq('company_id', company_id);
    }
    // searchQuery is a string that is used to search for jobs by title in the database
    if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
    }


    const { data, error } = await query;

    if (error) {
        console.error(error);
        return [];
    }

    return data;

}


export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);
  
    if (alreadySaved) {
      // If the job is already saved, remove it
      const { data, error: deleteError } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id);
  
      if (deleteError) {
        console.error("Error removing saved job:", deleteError);
        return data;
      }
  
      return data;
    } else {
      // If the job is not saved, add it to saved jobs
      const { data, error: insertError } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();
  
      if (insertError) {
        console.error("Error saving job:", insertError);
        return data;
      }
  
      return data;
    }
}


export async function getSingleJob(token, {job_id}) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("jobs")
  .select("*, company: companies(name,logo_url), applications: applications(*)")
  .eq("id", job_id)
  .single();

  if (error) {
    console.error("Error fetching job:", error);
    return null;
  }

  return data;
}

export async function updateHiringStatus(token, {job_id}, isOpen) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("jobs")
  .update({isOpen})
  .eq("id", job_id)
  .select();

  if (error) {
    console.error("Error updating Job:", error);
    return null;
  }

  return data;
}

// - post job
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}

// Read Saved Jobs
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}


export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

export async function deleteJob(token, {job_id}) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Deleting Job:", error);
    return null;
  }

  return data;
}
