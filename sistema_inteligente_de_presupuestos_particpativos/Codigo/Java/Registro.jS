/* ========================================
   VALIDADOR DE CURP - GOBIERNO DE MÉXICO
   ======================================== */

/**
 * Estructura de la CURP (18 caracteres):
 * Posiciones 1-2: Primera letra del apellido paterno + Primera vocal interna
 * Posiciones 3-4: Primera letra del apellido materno
 * Posición 5: Primera letra del nombre
 * Posiciones 6-11: Fecha de nacimiento (AAMMDD)
 * Posición 12: Sexo (H=Hombre, M=Mujer)
 * Posiciones 13-14: Estado de nacimiento
 * Posiciones 15-17: Consonantes internas de apellidos y nombre
 * Posición 18: Dígito verificador
 */

// ========================================
// CATÁLOGO DE ESTADOS
// ========================================
const estadosCurp = {
    'AS': 'Aguascalientes',
    'BC': 'Baja California',
    'BS': 'Baja California Sur',
    'CC': 'Campeche',
    'CL': 'Coahuila',
    'CM': 'Colima',
    'CS': 'Chiapas',
    'CH': 'Chihuahua',
    'DF': 'Ciudad de México',
    'DG': 'Durango',
    'GT': 'Guanajuato',
    'GR': 'Guerrero',
    'HG': 'Hidalgo',
    'JC': 'Jalisco',
    'MC': 'México',
    'MN': 'Michoacán',
    'MS': 'Morelos',
    'NT': 'Nayarit',
    'NL': 'Nuevo León',
    'OC': 'Oaxaca',
    'PL': 'Puebla',
    'QT': 'Querétaro',
    'QR': 'Quintana Roo',
    'SP': 'San Luis Potosí',
    'SL': 'Sinaloa',
    'SR': 'Sonora',
    'TC': 'Tabasco',
    'TS': 'Tamaulipas',
    'TL': 'Tlaxcala',
    'VZ': 'Veracruz',
    'YN': 'Yucatán',
    'ZS': 'Zacatecas',
    'NE': 'Nacido en el Extranjero'
};

// ========================================
// FUNCIÓN PRINCIPAL: VALIDAR CURP
// ========================================
function validarCURP() {
    const curpInput = document.getElementById('curp');
    const curp = curpInput.value.toUpperCase().trim();
    
    // Validar longitud
    if (curp.length !== 18) {
        alert('La CURP debe tener exactamente 18 caracteres');
        return;
    }
    
    // Validar formato con expresión regular
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/;
    if (!curpRegex.test(curp)) {
        alert('Formato de CURP inválido');
        return;
    }
    
    // Extraer datos de la CURP
    const datos = extraerDatosCURP(curp);
    
    // Rellenar campos del formulario
    rellenarFormulario(datos);
    
    // Mostrar mensaje de éxito
    alert('CURP validada correctamente');
}

// ========================================
// EXTRAER DATOS DE LA CURP
// ========================================
function extraerDatosCURP(curp) {
    // Extraer fecha de nacimiento (posiciones 5-10)
    const año = curp.substring(4, 6);
    const mes = curp.substring(6, 8);
    const dia = curp.substring(8, 10);
    
    // Determinar el siglo (si es mayor a 24, es 1900, sino 2000)
    const añoCompleto = parseInt(año) > 24 ? '19' + año : '20' + año;
    const fechaNacimiento = `${dia}/${mes}/${añoCompleto}`;
    
    // Extraer sexo (posición 11)
    const sexoCodigo = curp.charAt(10);
    const sexo = sexoCodigo === 'H' ? 'HOMBRE' : 'MUJER';
    
    // Extraer estado de nacimiento (posiciones 12-13)
    const estadoCodigo = curp.substring(11, 13);
    const estadoNacimiento = estadosCurp[estadoCodigo] || 'Desconocido';
    
    // Extraer iniciales para generar nombres aproximados
    const apellidoPaterno = generarApellidoPaterno(curp);
    const apellidoMaterno = generarApellidoMaterno(curp);
    const nombre = generarNombre(curp);
    
    return {
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        sexo: sexo,
        fechaNacimiento: fechaNacimiento,
        estadoNacimiento: estadoNacimiento
    };
}

// ========================================
// GENERAR NOMBRES APROXIMADOS
// ========================================
// Nota: La CURP solo contiene iniciales, no nombres completos
// Estas funciones generan nombres aproximados con las iniciales

function generarApellidoPaterno(curp) {
    // Primeras 2 letras de la CURP
    const iniciales = curp.substring(0, 2);
    
    // Base de datos de apellidos comunes (simplificado)
    const apellidos = {
        'CA': 'CHAVEZ',
        'CH': 'CHAVEZ',
        'GA': 'GARCIA',
        'GO': 'GOMEZ',
        'HE': 'HERNANDEZ',
        'LO': 'LOPEZ',
        'MA': 'MARTINEZ',
        'ME': 'MEDINA',
        'MO': 'MORALES',
        'PE': 'PEREZ',
        'RA': 'RAMIREZ',
        'RO': 'RODRIGUEZ',
        'SA': 'SANCHEZ',
        'FE': 'FERNANDEZ',
        'VI': 'VILLANUEVA',
        'OR': 'ORTIZ'
    };
    
    return apellidos[iniciales] || iniciales.toUpperCase();
}

function generarApellidoMaterno(curp) {
    // Tercera letra de la CURP
    const inicial = curp.charAt(2);
    
    const apellidos = {
        'A': 'ALVAREZ',
        'C': 'CRUZ',
        'D': 'DIAZ',
        'F': 'FLORES',
        'G': 'GONZALEZ',
        'H': 'HERNANDEZ',
        'J': 'JIMENEZ',
        'L': 'LOPEZ',
        'M': 'MEDINA',
        'R': 'ROJAS',
        'S': 'SANCHEZ',
        'T': 'TORRES',
        'V': 'VILLANUEVA',
        'P': 'PEREZ'

    };
    
    return apellidos[inicial] || inicial;
}

function generarNombre(curp) {
    // Cuarta letra de la CURP
    const inicial = curp.charAt(3);
    
    const nombres = {
        'A': 'ADRIAN',
        'C': 'JOSECARLOS',
        'D': 'DANIEL',
        'E': 'EDUARDO',
        'F': 'FRANCISCO',
        'G': 'GABRIEL',
        'J': 'JUAN JOSE',
        'L': 'LUIS',
        'M': 'MIRIAM ITZEL',
        'O': 'OSCAR',
        'R': 'RICARDO',
        'S': 'SERGIO'
    };
    
    return nombres[inicial] || inicial;
}

// ========================================
// RELLENAR FORMULARIO CON DATOS
// ========================================
function rellenarFormulario(datos) {
    // Rellenar campos de solo lectura
    document.getElementById('nombre').value = datos.nombre;
    document.getElementById('apellidoPaterno').value = datos.apellidoPaterno;
    document.getElementById('apellidoMaterno').value = datos.apellidoMaterno;
    document.getElementById('sexo').value = datos.sexo;
    document.getElementById('fechaNacimiento').value = datos.fechaNacimiento;
    
    // Cargar estados en el select
    cargarEstados();
}

// ========================================
// CARGAR CATÁLOGO DE ESTADOS
// ========================================
function cargarEstados() {
    const estadoSelect = document.getElementById('estado');
    
    // Limpiar opciones existentes
    estadoSelect.innerHTML = '<option value="">Selecciona un estado</option>';
    
    // Agregar estados
    const estados = [
        'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
        'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Ciudad de México',
        'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
        'Estado de México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León',
        'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
        'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
        'Veracruz', 'Yucatán', 'Zacatecas'
    ];
    
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        estadoSelect.appendChild(option);
    });
}

// ========================================
// VALIDACIÓN DE CÓDIGO POSTAL
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const coloniaSelect = document.getElementById('colonia');

    // Limpiar select
    coloniaSelect.innerHTML = '<option value="">Selecciona una colonia</option>';

    // Municipios del ESTADO DE MÉXICO (125)
    const colonias = [
        "Acambay", "Acolman", "Aculco", "Almoloya de Alquisiras", "Almoloya de Juárez",
        "Almoloya del Río", "Amanalco", "Amatepec", "Amecameca", "Apaxco", "Atenco",
        "Atizapán", "Atizapán de Zaragoza", "Atlacomulco", "Atlautla", "Axapusco",
        "Ayapango", "Calimaya", "Capulhuac", "Coacalco de Berriozábal", "Coatepec Harinas",
        "Cocotitlán", "Coyotepec", "Cuautitlán", "Chalco", "Chapa de Mota", "Chapultepec",
        "Chiautla", "Chicoloapan", "Chiconcuac", "Chimalhuacán", "Donato Guerra",
        "Ecatepec de Morelos", "Ecatzingo", "Huehuetoca", "Hueypoxtla", "Huixquilucan",
        "Isidro Fabela", "Ixtapaluca", "Ixtapan de la Sal", "Ixtapan del Oro",
        "Ixtlahuaca", "Jaltenco", "Jilotepec", "Jilotzingo", "Jiquipilco",
        "Jocotitlán", "Joquicingo", "Juchitepec", "La Paz", "Lerma", "Luvianos",
        "Malinalco", "Melchor Ocampo", "Metepec", "Mexicaltzingo", "Morelos",
        "Naucalpan de Juárez", "Nezahualcóyotl", "Nextlalpan", "Nicolás Romero",
        "Nopaltepec", "Ocoyoacac", "Ocuilan", "El Oro", "Otumba", "Otzoloapan",
        "Otzolotepec", "Ozumba", "Papalotla", "Polotitlán", "Rayón", "San Antonio la Isla",
        "San Felipe del Progreso", "San Martín de las Pirámides", "San Mateo Atenco",
        "San Simón de Guerrero", "Santo Tomás", "Soyaniquilpan de Juárez", "Sultepec",
        "Tecámac", "Tejupilco", "Temamatla", "Temascalapa", "Temascalcingo",
        "Temascaltepec", "Temoaya", "Tenancingo", "Tenango del Aire", "Tenango del Valle",
        "Teoloyucan", "Teotihuacán", "Tepetlaoxtoc", "Tepetlixpa", "Tepotzotlán",
        "Tequixquiac", "Texcaltitlán", "Texcalyacac", "Texcoco", "Tezoyuca",
        "Tianguistenco", "Timilpan", "Tlalmanalco", "Tlalnepantla de Baz",
        "Tlatlaya", "Toluca", "Tonatico", "Tultepec", "Tultitlán", "Valle de Bravo",
        "Valle de Chalco Solidaridad", "Villa de Allende", "Villa del Carbón",
        "Villa Guerrero", "Villa Victoria", "Xonacatlán", "Zacazonapan",
        "Zacualpan", "Zinacantepec", "Zumpahuacán", "Zumpango"
    ];

    colonias.forEach(colonia => {
        const opt = document.createElement("option");
        opt.value = colonia;
        opt.textContent = colonia;
        coloniaSelect.appendChild(opt);
    });

});



// ========================================
// VALIDACIÓN DE CORREOS ELECTRÓNICOS
// ========================================
document.getElementById('emailConfirm')?.addEventListener('blur', function() {
    const email = document.getElementById('email').value;
    const emailConfirm = this.value;
    
    if (email && emailConfirm && email !== emailConfirm) {
        alert('Los correos electrónicos no coinciden');
        this.value = '';
    }
});

// ========================================
// VALIDACIÓN DE TELÉFONOS
// ========================================
document.getElementById('phone-confirm')?.addEventListener('blur', function() {
    const phone = document.getElementById('phone').value;
    const phoneConfirm = this.value;
    
    if (phone && phoneConfirm && phone !== phoneConfirm) {
        alert('Los números de teléfono no coinciden');
        this.value = '';
    }
});

// ========================================
// FORMATO AUTOMÁTICO DEL CURP
// ========================================
document.getElementById('curp')?.addEventListener('input', function(e) {
    // Convertir a mayúsculas automáticamente
    this.value = this.value.toUpperCase();
    
    // Limitar a 18 caracteres
    if (this.value.length > 18) {
        this.value = this.value.substring(0, 18);
    }
});

// ========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Validador de CURP cargado correctamente');
    
    // Cargar estados al inicio
    cargarEstados();
});