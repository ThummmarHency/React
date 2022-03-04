export const FormAttribute =[
    {
      label: "Email : ",
      type: "text",
      name: "email",
      placeholder: "Enter Your email",
      errorMsg: "it should be a valid email address",  
      pattern: "^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"
  
    },
    {
      label: "Password : ",
      type: "password",
      name: "password",
      placeholder: "Enter password",
      errorMsg: "password should be 8-16 characters long",
      pattern:"^[A-Za-z0-9]{5,15}$"
    },
    {
        label: "Name : ",
        type: "text",
        name: "name",
        placeholder: "Enter name",
        errorMsg: "Name should be 3-16 character and shouldn't include any special character",
        pattern:"^[A-Za-z0-9]{3,16}$",
      },
      {
       
        label: "Role : ",
        type: "text",
        name: "role",
        placeholder: "student/teacher",
        errorMsg: "Role should be either student or teacher ",
        pattern:"^student|teacher$",
       
      },
  ]