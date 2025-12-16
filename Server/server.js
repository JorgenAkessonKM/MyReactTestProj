const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./db');

const corsOptions = {
        origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: 'dev-secret-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// initialize DB then start server
db.init().then(() => {
    console.log('SQLite DB initialized');
    app.listen(8080, () => {
        console.log("Server started on port 8080")
    })
}).catch((err) => {
    console.error('Failed to initialize DB', err);
    process.exit(1);
});

app.get("/api/users", (req, res) => {
    res.json([{"id":1,"name":"Jörgen Åkesson","username":"Bret","email":"Sincere@april.biz","address":{"street":"KulasLight","suite":"Apt.556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phone":"1-770-736-8031x56442","website":"hildegard.org","company":{"name":"Romaguera Crona","catchPhrase":"Multi-layeredclient-serverneural-net","bs":"harnessreal-timee-markets"}},{"id":2,"name":"Ervin Howell","username":"Antonette","email":"Shanna@melissa.tv","address":{"street":"VictorPlains","suite":"Suite879","city":"Wisokyburgh","zipcode":"90566-7771","geo":{"lat":"-43.9509","lng":"-34.4618"}},"phone":"010-692-6593x09125","website":"anastasia.net","company":{"name":"Deckow Crist","catchPhrase":"Proactivedidacticcontingency","bs":"synergizescalablesupply-chains"}},{"id":3,"name":"Clementine Bauch","username":"Samantha","email":"Nathan@yesenia.net","address":{"street":"DouglasExtension","suite":"Suite847","city":"McKenziehaven","zipcode":"59590-4157","geo":{"lat":"-68.6102","lng":"-47.0653"}},"phone":"1-463-123-4447","website":"ramiro.info","company":{"name":"Romaguera Jacobson","catchPhrase":"Facetofacebifurcatedinterface","bs":"e-enablestrategicapplications"}},{"id":4,"name":"Patricia Lebsack","username":"Karianne","email":"Julianne.OConner@kory.org","address":{"street":"HoegerMall","suite":"Apt.692","city":"SouthElvis","zipcode":"53919-4257","geo":{"lat":"29.4572","lng":"-164.2990"}},"phone":"493-170-9623x156","website":"kale.biz","company":{"name":"Robel-Corkery","catchPhrase":"Multi-tieredzerotoleranceproductivity","bs":"transitioncutting-edgewebservices"}},{"id":5,"name":"Chelsey Dietrich","username":"Kamren","email":"Lucio_Hettinger@annie.ca","address":{"street":"SkilesWalks","suite":"Suite351","city":"Roscoeview","zipcode":"33263","geo":{"lat":"-31.8129","lng":"62.5342"}},"phone":"(254)954-1289","website":"demarco.info","company":{"name":"KeeblerLLC","catchPhrase":"User-centricfault-tolerantsolution","bs":"revolutionizeend-to-endsystems"}},{"id":6,"name":"Mrs.Dennis Schulist","username":"Leopoldo_Corkery","email":"Karley_Dach@jasper.info","address":{"street":"NorbertoCrossing","suite":"Apt.950","city":"SouthChristy","zipcode":"23505-1337","geo":{"lat":"-71.4197","lng":"71.7478"}},"phone":"1-477-935-8478x6430","website":"ola.org","company":{"name":"Considine Lockman","catchPhrase":"Synchronisedbottom-lineinterface","bs":"e-enableinnovativeapplications"}},{"id":7,"name":"Kurtis Weissnat","username":"Elwyn.Skiles","email":"Telly.Hoeger@billy.biz","address":{"street":"RexTrail","suite":"Suite280","city":"Howemouth","zipcode":"58804-1099","geo":{"lat":"24.8918","lng":"21.8984"}},"phone":"210.067.6132","website":"elvis.io","company":{"name":"JohnsGroup","catchPhrase":"Configurablemultimediatask-force","bs":"generateenterprisee-tailers"}},{"id":8,"name":"Nicholas Runolfsdottir","username":"Maxime_Nienow","email":"Sherwood@rosamond.me","address":{"street":"EllsworthSummit","suite":"Suite729","city":"Aliyaview","zipcode":"45169","geo":{"lat":"-14.3990","lng":"-120.7677"}},"phone":"586.493.6943x140","website":"jacynthe.com","company":{"name":"AbernathyGroup","catchPhrase":"Implementedsecondaryconcept","bs":"e-enableextensiblee-tailers"}},{"id":9,"name":"Glenna Reichert","username":"Delphine","email":"Chaim_McDermott@dana.io","address":{"street":"DaynaPark","suite":"Suite449","city":"Bartholomebury","zipcode":"76495-3109","geo":{"lat":"24.6463","lng":"-168.8889"}},"phone":"(775)976-6794x41206","website":"conrad.com","company":{"name":"YostandSons","catchPhrase":"Switchablecontextually-basedproject","bs":"aggregatereal-timetechnologies"}},{"id":10,"name":"Clementina DuBuque","username":"Moriah.Stanton","email":"Rey.Padberg@karina.biz","address":{"street":"KattieTurnpike","suite":"Suite198","city":"Lebsackbury","zipcode":"31428-2261","geo":{"lat":"-38.2386","lng":"57.2232"}},"phone":"024-648-3804","website":"ambrose.net","company":{"name":"HoegerLLC","catchPhrase":"Centralizedempoweringtask-force","bs":"targetend-to-endmodels"}}]);
});

app.get("/api/users_new", async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('Failed to fetch users', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
    const { name, username, email, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
    try {
        const hash = await bcrypt.hash(password, 10);
        await db.createUser({ name, username, email, passwordHash: hash });
        const user = await db.getUserByUsername(username);
        req.session.userId = user.id;
        res.json({ id: user.id, name: user.name, username: user.username, email: user.email });
    } catch (err) {
        console.error('Register error', err);
        if (err && err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ error: 'Username already exists' });
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
    try {
        const user = await db.getUserWithPasswordByUsername(username);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
        req.session.userId = user.id;
        res.json({ id: user.id, name: user.name, username: user.username, email: user.email });
    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ ok: true });
    });
});

app.get('/api/auth/validate', async (req, res) => {
    if (!req.session || !req.session.userId) return res.json({ authenticated: false });
    try {
        const user = await db.getUserById(req.session.userId);
        if (!user) return res.json({ authenticated: false });
        res.json({ authenticated: true, user });
    } catch (err) {
        console.error('Validate error', err);
        res.status(500).json({ error: 'Server error' });
    }
});