const Query= {
    retrieve_all_users : 'select id, first_name as firstName, last_name as lastName, username as userName, password, email, last_login as lastLogin, active from ab_user',
    retrieve_user_by_name: "select id, first_name as firstName, last_name as lastName, username as userName, password, email, last_login as lastLogin from ab_user where (username = ? or email = ?) and active = 1",
    retrieve_user_roles: "select ur.id as mapingId, u.id as userId, u.username as userName, r.id as roleId, r.name as roleName from ab_user u, ab_user_role ur, ab_role r where r.id = ur.role_id and u.id = ur.user_id and u.username = ?"
}

module.exports = Query;