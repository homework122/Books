import userStore from './userStore'
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