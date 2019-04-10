const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 8081
const multer = require('multer')
const fs = require('fs')
const mysql = require('mysql')
var history = require('connect-history-api-fallback')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(history())
process.env.SECRET_KEY = "fdzfzrfrefref575645E53DGGHHG443325643";

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'terminator',
    database: 'test'
})

connection.connect()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const sameName = fs.readdirSync('./uploads').find(curentFile => curentFile === file.originalname)
        if (sameName) {
            return cb(new Error(`Il existe déja une ${file.mimetype} du même nom dans la base`))
        }
        return cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
app.use('/', express.static(__dirname))
const upload = multer({ storage: storage }).single('image')

app.use(bodyParser.json())

/* app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
})) */

app.use(cors({
    origin: ['http://localhost:8080']
}))

app.post('/upload/image', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.send(err.message)
        } else {
            res.send(`votre enregistrement c'est bien passé`)
        }
    })
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})
app.get('/getEventsWeek', (req, res) => {
    const q = 'SELECT sequence_name, sequence_color, start_date, end_date FROM diffusion_date dif INNER JOIN sequence seq ON dif.sequence_id = seq.sequence_id'
    connection.query(q, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.get('/getEvents', (req, res) => {
    const q = 'SELECT sequence_id, sequence_color, sequence_name FROM sequence'
    connection.query(q, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.get('/getDataSlide', (req, res) => {
    const q = `SELECT sequence_name, sequence_color, duration, sequence_position, url FROM sequence seq INNER JOIN sequence_media sm ON seq.sequence_id = sm.sequence_id INNER JOIN media med ON sm.media_id = med.media_id WHERE seq.sequence_id = ${req.query.id} ORDER BY sm.sequence_position`
    connection.query(q, (err, result) => {
        if (err) throw err
        let data = {}
        if (!result.length) {
            const q2 = 'SELECT sequence_color, sequence_name FROM sequence WHERE sequence_id = ' + req.query.id
            connection.query(q2, (err2, result2) => {
                if (err2) throw err2
                data = {
                    sequence_name: result2[0].sequence_name,
                    sequence_color: result2[0].sequence_color,
                    table_sequences: [{}]
                }
                res.send(data)
            })
        } else {
            const table_sequences = result.map(r => {
                return {
                    duration: r.duration,
                    sequence_position: r.sequence_position,
                    url: r.url
                }
            })
            data = {
                sequence_name: result[0].sequence_name,
                sequence_color: result[0].sequence_color,
                table_sequences
            }
            res.send(data)
        }
    })
})

app.post('/createSequence', (req, res) => {
    const q = `INSERT INTO sequence (sequence_name, user_id, sequence_color) VALUES ('${req.body.name_sequence}', 0, '${req.body.color_sequence}')`
    connection.query(q, (err, result) => {
        if (err) throw err
        const q2 = `SELECT sequence_id FROM sequence WHERE sequence_name = '${req.body.name_sequence}'`
        connection.query(q2, (err2, result2) => {
            if (err2) throw err2
            const id = result2[0].sequence_id
            if (req.body.eventsWeek.length) {
                let q3 = 'INSERT INTO diffusion_date (sequence_id, start_date, end_date) VALUES '
                req.body.eventsWeek.forEach((e, i) => {
                    q3 += `(${id}, '${e.start_date}', '${end_date}') ${(i !== req.body.eventsWeek.length - 1) ? ', ' : ''}`
                })
                connection.query(q3, (err3, result3) => {
                    if (err3) throw err3
                    res.send({ id })
                })
            } else {
                res.send({ id })
            }
        })
    })
})

app.post('/updateNameSequence', (req, res) => {
    const q = `UPDATE sequence SET sequence_name = '${req.body.name_sequence}' WHERE sequence_id = ${req.body.id}`
    connection.query(q, (err, result) => {
        if (err) throw err
        res.send('OK')
    })
})

app.post('/updateColorSequence', (req, res) => {
    const q = `UPDATE sequence SET sequence_color = '${req.body.color_sequence}' WHERE sequence_id = ${req.body.id}`
    connection.query(q, (err, result) => {
        if (err) throw err
        res.send('OK')
    })
})

app.post('/insertPeriods', (req, res) => {
    let q3 = 'INSERT INTO diffusion_date (sequence_id, start_date, end_date) VALUES '
    req.body.eventsWeek.forEach((e, i) => {
        q3 += `(${req.body.id}, '${e.start_date}', '${end_date}') ${(i !== req.body.eventsWeek.length - 1) ? ', ' : ''}`
    })
    connection.query(q3, (err3, result3) => {
        if (err3) throw err3
        res.send('OK')
    })
})

app.post('/addMedia', (req, res) => {
    const q = `INSERT INTO media (url) VALUES ('${req.body.url}')`
    connection.query(q, (err, result) => {
        if (err) throw err
        const q2 = `SELECT media_id FROM media WHERE url = '${req.body.url}'`
        connection.query(q2, (err2, result2) => {
            if (err2) throw err2
            const media_id = result2[0].media_id
            const q3 = `INSERT INTO sequence_media (media_id, sequence_id,  duration, sequence_position) VALUES (${media_id}, ${req.body.id}, 100, ${req.body.sequence_position})`
            connection.query(q3, (err3, result3) => {
                if (err3) throw err3
                res.send('OK')
            })
        })
    })
})

app.post('/user/login', (req, res) => {
    // appData pour la gestion des requête =>
    let appData = {};
    let email = req.body.password;
    let password = req.body.password;
    // On selectionne l'email  l'user a partir de l'email =>
    const selectEmail = 'SELECT * FROM users WHERE email = ?'
    connection.query(selectEmail, req.body.email, function (err, rows, fields) {
        //console.log(rows) // Pour voir la requete complete
        // Je gere encore une fois l'erreur si l'email ne correspond à rien en base de donnée =>
        if (err) {
            appData.error = 1;
            appData["data"] = "Error Occured!";
            res.status(500).json(appData);
        } else {
            // donc si cela correspond on devrais avoir un tableau plus grands que zero =>
            if (rows.length > 0) {
                console.log('Password:', rows[0].password); // <= Mots de passe stocker en base
                console.log(password); // <= Mots de passe entrez par l'utilisateur
                //Bcrypt compare sert à comparer le mots de passe entré par l'user sans le cryptage  avec celui stocker en base qui est crypté =>
                bcrypt.compare(password, rows[0].password, function (err, response) {
                    //On gere l'erreur si toute fois l'erreur venait à arriver =>
                    if (err) {
                        appData.error = 1;
                        appData["data"] = "Mots de passe ne correspond pas";
                        res.status(403).json(appData);
                    } else {
                        // ici bcrypt nous retourne soit une valeur booleen lors de la comparaison
                        // donc si cela est false, je lui dis de nous retourner une erreur 403
                        // Pas de place à l'erreur =>
                        if (response == false) {
                            console.log(response);
                            appData.error = 1;
                            appData["data"] = "Mots de passe ne correspond pas";
                            res.status(403).json(appData);

                        }
                        // Ici la reponse et true =>
                        else {
                            console.log('response', response);
                            // JsonWebToken entre en jeu on lui passe un object avec l'email et une iat qui correspond à la date actuelle - 50s
                            // Le deuxieme parametre c'est la clef secret ;)  reste entre nous et le troixieme parametre c'est l'expiration =>
                            let token = jwt.sign({ users: rows[0].email, iat: Math.floor(Date.now() / 1000) - 50 }, process.env.SECRET_KEY, {
                                expiresIn: "2 days"
                            });
                            // Gestion du succés on retourne le avec l'email associé au token ainsi que le token =>
                            appData.error = 0;
                            appData["Name"] = rows[0].first_name;
                            appData["User"] = rows[0].email;
                            appData["token"] = token;
                            res.status(200).json(appData);
                        }
                    }
                })

            }
            // si l'email n'existe pas on retourne en json l'email n'existe pas et un status 403 parce qu'on aime bien sa =>
            else {
                appData.error = 1;
                appData["data"] = "Email n'existe pas !";
                res.status(403).json(appData);
            }
        }
    });

})

app.post('/user/register', (req, res) => {
    // variable today donc la date du jour  pour être inseré en base de donnée =>
    var today = new Date();
    // appData pour la gestion des requete si la requete est bonne ou pas =>
    let appData = {
        "error": 1,
        "data": "",
    };
    // Initialisation des variable pour ne pas se repéter =>
    let userData = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": today,

    };
    //ON RECUPERE L'EMAIL pour pouvoir faire le tries de ce que l'utilisateur a rentré =>
    connection.query('SELECT * FROM users WHERE email = ?', userData.email, function (err, rows, fields) {
        console.log(rows)
        // Si cela correspond a quelque chose en base =>
        if (!rows.length) {
            console.log('Toto !!!!')
            // Bcrypt entre en jeu on lui envoie le mots de passe de l'utilisateur =>
            bcrypt.hash(userData.password, 10, (err, hash) => {
                userData.password = hash
                const insertUser = 'INSERT INTO users SET ?';
                // Une fois que le mots de passe est crypté par Bcrypt on  l'insert dans la base =>
                connection.query(insertUser, userData, function (err, rows, fields) {
                    // Je gére le succés de la requete =>
                    if (!err) {
                        appData.error = 0;
                        appData["data"] = "User registered successfully!";
                        res.status(201).json(appData);
                    }
                    // Je gére l'erreur de la requete si cela echoue =>
                    else {
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    }
                });

            })
        }
    })

})

app.listen(port)