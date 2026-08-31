"use client"
import TeamList from "@/features/teams/components/TeamList"
import { useCreateTeam, useMyTeams } from "@/features/teams/hook/useTeams";
import { toast } from "sonner";


const ManageTeams = () => {
  const {mutateAsync:createTeam} = useCreateTeam()
  const {data:teams} = useMyTeams()
  const handleCreateTeam = async (data: { name: string; description: string; }) => { 
    // Call your create-team mutation here console.log("Create team:", data);
  const response = await createTeam(data);
     console.log("response",response)
    };

  return (
    <div className="min-h-screen ">
        <h1 className="text-xl text-start text-orange-300 mt-10">Manage Teams ManageTeams</h1>
        {/* <div className="flex justify-center items-center rounded-lg border p-8 mt-10" style={{ borderColor: "#E2E8F0", background: "#fff" }}>
            <h4 className="text-[24px] font-medium">Coming soon..</h4>
        </div> */}
        <TeamList teams={teams} onCreateTeam={handleCreateTeam}/>
    </div>
  )
}

export default ManageTeams