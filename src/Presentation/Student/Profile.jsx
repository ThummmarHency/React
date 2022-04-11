import React from 'react'
import CustomTable from '../../Shared/CustomTable'
const Profile = () => {
   
  return (
      
        <CustomTable api="/student/getStudentDetail" Header="Profile" editPfl="Edit profile"/>  

  )
}

export default Profile