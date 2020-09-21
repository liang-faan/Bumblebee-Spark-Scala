const Query= {
    retrieve_all_users : 'select id, first_name as firstName, last_name as lastName, username as userName, password, email, last_login as lastLogin, active from ab_user',
    retrieve_user_by_name: "select id, first_name as firstName, last_name as lastName, username as userName, password, email, last_login as lastLogin from ab_user where (username = ? or email = ?) and active = 1"
}

module.exports = Query;