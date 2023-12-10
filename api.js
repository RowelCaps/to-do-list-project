export async function userLogin(creds){
    try{
        const res = await fetch('http://localhost:3000/api/login',{
            method: "post",
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(creds)
        });
    
        if(res.ok){
            const data = await res.json();
            return data;
        } else {
            return {success: false, message:'Invalid Username or Password'};
        }
    } catch(err){
        return {success: false, message: `Login error: ${err.message}`};
    }
}

export async function addUserTask(taskData){
    try{
        console.log("testing");
        const res = await fetch('http://localhost:3000/api/schedule',  {
            method: 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskData)
        })
        
        if(res.ok){
            const resContent = await res.json();
            return data;
        } else{
            return {success: false, message: "Coupld not upload task"};
        }
    } catch(err){
        return {success: false, message: err.message};
    }
}