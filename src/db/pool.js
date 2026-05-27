import {Pool} from 'pg'


export default new Pool({
    connectionString: "postgresql://razeft:Shizumi91@localhost:5432/member_only"
})