/* SmartMobility Terrain 5.1.1 — déployer comme application Web, exécuter en tant que propriétaire. */
function doPost(e) {
  let stage = "REQUEST";
  try {
    if (!e || !e.postData || e.postData.contents.length > 9000000) throw Error('request');
    const p = JSON.parse(e.postData.contents);
    if (typeof p.owner !== 'string' || !p.owner || p.owner.length > 128 || /[\r\n]/.test(p.owner)) throw Error('owner');
    if (!/^[a-f0-9]{64}$/.test(p.sha256) || !/^[a-f0-9]{64}$/.test(p.id) || !/^[a-f0-9]{64}$/.test(p.signature)) throw Error('format');
    if (!Number.isSafeInteger(p.time) || Math.abs(Date.now()/1000 - p.time) > 600) throw Error('time');
    const format = p.protocol === 2 ? p.format : 'xlsx';
    if (!['xlsx','zip'].includes(format)) throw Error('format');
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('TOKEN_' + p.owner);
    if (!secret || secret.length < 32) throw Error('token');
    const canonical = p.owner + '\n' + p.sha256 + '\n' + p.id + '\n' + p.time + (p.protocol === 2 ? '\n' + format : '');
    if (!constantEqual(hex(Utilities.computeHmacSha256Signature(canonical, secret, Utilities.Charset.UTF_8)), p.signature)) throw Error('signature');
    if (typeof p.data !== 'string' || p.data.length > 8388608) throw Error('size');
    const bytes = Utilities.base64Decode(p.data);
    if (!bytes.length || bytes.length > 6291456 || bytes[0] !== 80 || bytes[1] !== 75) throw Error('xlsx');
    if (hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, bytes)) !== p.sha256) throw Error('digest');
    if (hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, p.owner + '\n' + (p.protocol === 2 ? format + '\n' : '') + p.sha256, Utilities.Charset.UTF_8)) !== p.id) throw Error('id');
    stage = 'FOLDER';
    const folder = DriveApp.getFolderById(props.getProperty('FOLDER_ID'));
    folder.getName();
    stage = 'WRITE';
    const lock = LockService.getScriptLock();lock.waitLock(30000);
    try {
      const name = (format === 'zip' ? 'Photos_' : 'Releves_') + p.id + '.' + format;
      const existing = folder.getFilesByName(name);
      let file;
      if (existing.hasNext()) {
        file = existing.next();
        if (hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, file.getBlob().getBytes())) !== p.sha256) throw Error('existing');
      } else {
        file = folder.createFile(Utilities.newBlob(bytes, format === 'zip' ? 'application/zip' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', name));
        file.setDescription('SmartMobility 5.1.1 | compte : ' + p.owner + ' | SHA-256 : ' + p.sha256);
      }
      return reply({ok:true,format:format,id:p.id,sha256:p.sha256,fileId:file.getId(),name:file.getName()});
    } finally { lock.releaseLock(); }
  } catch (error) {
    const known = {request:'REQUEST',owner:'OWNER',format:'FORMAT',time:'CLOCK',token:'TOKEN_MISSING',signature:'SIGNATURE',size:'SIZE',xlsx:'CONTENT',digest:'DIGEST',id:'ID',existing:'EXISTING_FILE'};
    const code = known[error.message] || stage;
    console.warn('SMARTMOBILITY_ERROR: ' + code);
    return reply({ok:false,code:code,message:'Transfert non confirmé. Vérifier configuration et journal du service.'});
  }
}
function reply(value) {return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
function hex(bytes) {return bytes.map(b => ('0' + ((b + 256) % 256).toString(16)).slice(-2)).join('');}
function constantEqual(a,b) {if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}

function doGet() { return reply({service:"SmartMobilityTerrain",version:"5.1.1",protocol:2,formats:["xlsx","zip"],message:"Service disponible. Un transfert réel reste à vérifier."}); }
