# Mombamomba 
API namboarina tamin'ny Node.js sy MySQL mahakasika ny tsingerin'ny fadimbolan'ny vehivavy.

# Fametrahana
1. Alaivo ilay "fichier" [node_mbolana.sql](/files/) ary ampidiro amin'ny "serveur" MySQL/MariaDB.
2. Mandehana ao amin'ny "répertoire" [prisma](prisma/) ka adikao amina "fichier" `.env` ilay `.env.example`.
3. Ovay ireo solon'anarana sy teny miafina ary adiresin'ilay "serveur" sy anaran'ny "base de données" ao amin'ny `.env`.
4. Ataovy ireto baiko ireto :

```
npm i
npx prisma db pull
npx prisma generate
npm start
```
5. Mandehana amin'ny http://localhost:2800

# Tsara ho fantatra
- Ny "logs" dia azonao jerena ao amin'ny `prod.log` sy `uncaughtExceptions.log`.
