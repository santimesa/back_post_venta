import sql from 'mssql'

const dbSetting={
    user:'sa',
    password:'santiago13*',
    server:'localhost',
    database:'BD_VENTAS',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}
export async function getConnection(){
    try {
        const pool= await  sql.connect(dbSetting);
        return pool
    } catch (error) {
        console.error(error)
    } 

}

getConnection();