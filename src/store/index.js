<<<<<<< HEAD
import userStore from './userStore'
=======
import userStore from './UserStore'
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
import TxtsStore from './TxtsStore'
import TypesStore from './TypesStore'
import AuditStore from './AuditStore'
import Opinion from './Opinion'
import Opquery from './OpQuery'
let Txts  = new TxtsStore();
let Types = new TypesStore();
let Audit = new AuditStore();
let user = new userStore();

let Op  = new Opinion();
let Opchaxun = new Opquery();
export default {
    user,
    Txts,
    Types,
    Audit,
    Op,
    Opchaxun

}