//---. Auxiliar Functions
//.Side Sections Resize
function resize() {
 try { 
    let left = document.getElementById('leftdiv').clientHeight;
    let center = document.getElementById('centerdiv').clientHeight;
    console.log(window.innerWidth)
      if (window.innerWidth > 700) {
        if(left<center || right<center) { 
          document.getElementById('leftdiv').style.height=(center+"px");
          document.getElementById('rightdiv').style.height=(center+"px");
        }
      }
      else {
          document.getElementById('leftdiv').style.height="auto";
          document.getElementById('rightdiv').style.height="auto";
      }  
     }
 catch (e) {console.log(e)}    
  }
//.Form's Data list Validation  -- Try to make a single function instead of 2, shame...
function validate(e) {
 try {
   let abort = false; let nulls = 0;
   let lists = ['year','distritos','ofertas'];
   let inputs = [Mform.year.value,Mform.distrito.value,Mform.oferta.value];
    for (let i=0;i<lists.length;i++) {
        let list= lists[i]; let input = inputs[i];
        let opt = document.querySelector("#" + list + " option[value='" + input + "']");
        if (opt == null) { nulls = nulls + 1 }
        else { 
            let optId = opt.attributes['op-id'].value; 
            if (parseInt(optId) < 0) { abort = true ; break } 
        }
    }
   if (abort == true || nulls == lists.length) {
    e.preventDefault();
    document.getElementById("formWarning").style.display = "block";
    return false;
   }
   return true
  }
 catch (e) {alert(e)}
}
//---.Run on Start  
//-.Datalist population
const distritos = ['LA PLATA','AVELLANEDA','LOMAS DE ZAMORA','LANÚS','LA MATANZA','FLORENCIO VARELA','BERAZATEGUI','ESTEBAN ECHEVERRÍA','TIGRE','GENERAL SAN MARTÍN','MORÓN','JOSÉ C. PAZ','ESCOBAR','SAN ANTONIO DE ARECO','9 DE JULIO','GENERAL PUEYRREDÓN','BAHÍA BLANCA','CORONEL BRANDSEN','QUILMES','EZEIZA','SAN ISIDRO','VICENTE LÓPEZ','MALVINAS ARGENTINAS','MORENO','SAN MIGUEL','CAMPANA','EXALTACIÓN DE LA CRUZ','ZÁRATE','SAN NICOLÁS','JUNÍN','BRAGADO','CARLOS CASARES','CHIVILCOY','PEHUAJÓ','TRES LOMAS','MONTE','PARTIDO DE LA COSTA','TANDIL','A. GONZALES CHAVES','BENITO JUÁREZ','TRES ARROYOS','PATAGONES','GUAMINÍ','25 DE MAYO','GENERAL ALVEAR','LAS FLORES','LOBOS','SALADILLO','BOLÍVAR','OLAVARRÍA','RAUCH','GENERAL PAZ','GENERAL BELGRANO','LUJÁN','BERISSO','ENSENADA','MAGDALENA','ALMIRANTE BROWN','PRESIDENTE PERÓN','SAN VICENTE','SAN FERNANDO','HURLINGHAM','TRES DE FEBRERO','ITUZAINGÓ','MERLO','CAÑUELAS','GENERAL RODRÍGUEZ','GENERAL LAS HERAS','MARCOS PAZ','MERCEDES','NAVARRO','SAN ANDRÉS DE GILES','SUIPACHA','PILAR','ARRECIFES','BARADERO','CAPITÁN SARMIENTO','RAMALLO','SAN PEDRO','CARMEN DE ARECO','PERGAMINO','ROJAS','SALTO','CHACABUCO','FLORENTINO AMEGHINO','GENERAL ARENALES','GENERAL PINTO','GENERAL VIAMONTE','LEANDRO N. ALEM','LINCOLN','ALBERTI','HIPÓLITO YRIGOYEN','CARLOS TEJEDOR','GENERAL VILLEGAS','PELLEGRINI','RIVADAVIA','SALLIQUELÓ','TRENQUE LAUQUEN','CHASCOMÚS','LEZAMA','PILA','AYACUCHO','CASTELLI','DOLORES','GENERAL LAVALLE','GENERAL MADARIAGA','MAIPÚ','PINAMAR','VILLA GESELL','GENERAL ALVARADO','BALCARCE','LOBERÍA','NECOCHEA','SAN CAYETANO','CORONEL DORREGO','CORONEL PRINGLES','LAPRIDA','CORONEL ROSALES','MONTE HERMOSO','VILLARINO','ADOLFO ALSINA','CORONEL SUÁREZ','DAIREAUX','GENERAL LAMADRID','PUÁN','SAAVEDRA','TORNQUIST','ROQUE PÉREZ','AZUL','COLÓN','LA MATANZA CORDÓN 1','LA MATANZA CORDÓN 2','MAR CHIQUITA','LA MATANZA CORDÓN 3','PUNTA INDIO','GENERAL GUIDO','TORDILLO','TAPALQUÉ','A GONZÁLES CHAVES','JOSÉ C PAZ','A. GONZÁLES CHAVES','CARMEN DE PATAGONES','GENERAL LA MADRID','A. GONZÁLEZ CHAVES'];
const offers = ["CEBAS","SEMIPRESENCIALIDAD","FINES DEUDORES","PRIMARIA","CENS","SECUNDARIA CON OFICIOS","FINES TRAYECTO SECUNDARIO","CONTEXTO DE ENCIERRO","EDUCACIÓN A DISTANCIA","FINES TRAYECTO PRIMARIO","SECUNDARIA PARA FORMACIÓN PROFESIONAL","FINES DEUDORES UNIVERSITARIOS","ED. EN ENTORNOS LABORALES","SECUNDARIA RURAL"];
//.Multiple Query
if (document.getElementsByName('Mform').length > 0) {
try {
  let list1 = document.getElementById('distritos');
  let list2 = document.getElementById('ofertas');
  for (let i=0;i<distritos.length;i++) {
    let option = document.createElement('option');
    option.value = distritos[i];
    option.setAttribute('op-id', i);
    list1.appendChild(option);
  }
  for (let i=0;i<offers.length;i++) {
    let option = document.createElement('option');
    option.value = offers[i];
    option.setAttribute('op-id', i);
    list2.appendChild(option);
  }
}
catch(e) {alert(e)}
}
