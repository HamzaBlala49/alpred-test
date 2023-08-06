export function check_permissions (permission) {

    let permissions = localStorage.getItem('permissions');
    
    if(permissions.includes(permission)){
        return true
    }else{
        return false
    }
}