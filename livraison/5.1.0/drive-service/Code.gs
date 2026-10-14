/* SmartMobility Terrain 5.1.0 — déployer comme application Web, exécuter en tant que propriétaire. */
function doPost(e) {
  try {
    if (!e || !e.postData || e.postData.contents.length > 9000000) throw Error('request');
    const p = JSON.parse(e.postData.contents);
    if (typeof p.owner !== 'string' || !p.owner || p.owner.length > 128 || /[\r\n]/.test(p.owner)) throw Error('owner');
    if (!/^[a-f0-9]{64}$/.test(p.sha256) || !/^[a-f0-9]{64}$/.test(p.id) || !/^[a-f0-9]{64}$/.test(p.signature)) throw Error('format');
    if (!Number.isSafeInteger(p.time) || Math.abs(Date.now()/1000 - p.time) > 600) throw Error('time');
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('TOKEN_' + p.owner);
    if (!secret || secret.length < 32) throw Error('auth');
    const canonical = p.owner + '\n' + p.sha256 + '\n' + p.id + '\n' + p.time;
    if (!constantEqual(hex(Utilities.computeHmacSha256Signature(canonical, secret, Utilities.Charset.UTF_8)), p.signature)) throw Error('auth');
    if (typeof p.data !== 'string' || p.data.length > 8388608) throw Error('size');
    const bytes = Utilities.base64Decode(p.data);
    if (!bytes.length || bytes.length > 6291456 || bytes[0] !== 80 || bytes[1] !== 75) throw Error('xlsx');
    if (hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, bytes)) !== p.sha256) throw Error('digest');
    if (hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, p.owner + '\n' + p.sha256, Utilities.Charset.UTF_8)) !== p.id) throw Error('id');
    const folder = DriveApp.getFolderById(props.getProperty('FOLDER_ID'));
    const lock = LockService.getScriptLock();lock.waitLock(30000);
    try {
      const name = 'Releves_' + p.id + '.xlsx';
      const existing = folder.getFilesByName(name);
      let file;
      if (existing.hasNext()) {
        file = existing.next();
        if (hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, file.getBlob().getBytes())) !== p.sha256) throw Error('existing');
      } else {
        file = folder.createFile(Utilities.newBlob(bytes, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', name));
        file.setDescription('SmartMobility 5.1.0 | compte : ' + p.owner + ' | SHA-256 : ' + p.sha256);
      }
      return reply({ok:true,id:p.id,sha256:p.sha256,fileId:file.getId(),name:file.getName()});
    } finally { lock.releaseLock(); }
  } catch (error) { return reply({ok:false,message:'Transfert non confirmé. Vérifier clé, horloge, dossier et déploiement.'}); }
}
function reply(value) {return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
function hex(bytes) {return bytes.map(b => ('0' + ((b + 256) % 256).toString(16)).slice(-2)).join('');}
function constantEqual(a,b) {if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}

function doGet() { return reply({service:"SmartMobilityTerrain",version:"5.1.0",message:"Service disponible. La configuration et un envoi réel restent à vérifier."}); }
