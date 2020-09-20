const Query= {
    retrieve_all_users : 'select * from ab_user',
    retrieve_user_by_name: "select id, first_name, last_name, username, password, email, last_login from ab_user where (username = ? or email = ?) and active = 1"
}

module.exports = Query;