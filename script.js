const malla = [
  {
    semestre: 'Semestre I',
    ramos: [
      { nombre: 'Química General I' },
      { nombre: 'Biología Celular' },
      { nombre: 'Elementos de Álgebra y Cálculo' },
      { nombre: 'Introducción a las Ciencias Farmacéuticas' },
      { nombre: 'Habilidades Comunicativas' },
      { nombre: 'Inglés I' }
    ]
  },
  {
    semestre: 'Semestre II',
    ramos: [
      { nombre: 'Química General II', prerequisitos: ['Química General I'] },
      { nombre: 'Química Orgánica I', prerequisitos: ['Química General I'] },
      { nombre: 'Morfología', prerequisitos: ['Biología Celular'] },
      { nombre: 'Física', prerequisitos: ['Elementos de Álgebra y Cálculo'] },
      { nombre: 'Inglés II', prerequisitos: ['Inglés I'] }
    ]
  },
  {
    semestre: 'Semestre III',
    ramos: [
      { nombre: 'Fisicoquímica Aplicada', prerequisitos: ['Física', 'Química General II'] },
      { nombre: 'Química Orgánica II', prerequisitos: ['Química Orgánica I'] },
      { nombre: 'Fisiología Humana', prerequisitos: ['Morfología'] },
      { nombre: 'Química Analítica', prerequisitos: ['Química General II'] },
      { nombre: 'Inglés III', prerequisitos: ['Inglés II'] }
    ]
  },
  {
    semestre: 'Semestre IV',
    ramos: [
      { nombre: 'Bioquímica General y Lab. Bioquímica', prerequisitos: ['Química Orgánica II'] },
      { nombre: 'Fisiopatología y Semiología', prerequisitos: ['Fisiología Humana'] },
      { nombre: 'Química Analítica e Instrumental', prerequisitos: ['Química Analítica'] },
      { nombre: 'Farmacocinética y Biofarmacia', prerequisitos: ['Fisicoquímica Aplicada'] },
      { nombre: 'Inglés IV', prerequisitos: ['Inglés III'] }
    ]
  },
  {
    semestre: 'Semestre V',
    ramos: [
      { nombre: 'Microbiología', prerequisitos: ['Bioquímica General y Lab. Bioquímica'] },
      { nombre: 'Lab. de Microbiología', prerequisitos: ['Microbiología'] },
      { nombre: 'Salud Pública I' },
      { nombre: 'Farmoquímica I', prerequisitos: ['Química Orgánica II'] },
      { nombre: 'Farmacología Humana I', prerequisitos: ['Fisiopatología y Semiología'] }
    ]
  },
  {
    semestre: 'Semestre VI',
    ramos: [
      { nombre: 'Fundamentos de Biología Molecular y Biotecnología', prerequisitos: ['Bioquímica General y Lab. Bioquímica'] },
      { nombre: 'Tecnología Farmacéutica I', prerequisitos: ['Química Analítica e Instrumental'] },
      { nombre: 'Farmacología Humana II', prerequisitos: ['Farmacología Humana I'] },
      { nombre: 'Botánica y Farmacognosia' }
    ]
  },
  {
    semestre: 'Semestre VII',
    ramos: [
      { nombre: 'Farmacovigilancia y Educación en Salud', prerequisitos: ['Farmacología Humana II'] },
      { nombre: 'Tecnología Farmacéutica II', prerequisitos: ['Tecnología Farmacéutica I'] },
      { nombre: 'Farmacología Humana III', prerequisitos: ['Farmacología Humana II'] },
      { nombre: 'Bioquímica Clínica', prerequisitos: ['Bioquímica General y Lab. Bioquímica'] },
      { nombre: 'Razonamiento Científico y TICS' }
    ]
  },
  {
    semestre: 'Semestre VIII',
    ramos: [
      { nombre: 'Salud Pública II', prerequisitos: ['Salud Pública I'] },
      { nombre: 'Tecnología Cosmética', prerequisitos: ['Tecnología Farmacéutica II'] },
      { nombre: 'Farmacia Clínica y Atención Farmacéutica I', prerequisitos: ['Farmacología Humana III'] },
      { nombre: 'Toxicología Clínica y Forense', prerequisitos: ['Farmacología Humana III'] },
      { nombre: 'Pensamiento Crítico' }
    ]
  },
  {
    semestre: 'Semestre IX',
    ramos: [
      { nombre: 'Farmacoeconomía y Marketing', prerequisitos: ['Farmacia Clínica y Atención Farmacéutica I'] },
      { nombre: 'Gestión y Control de Calidad Farmacéutica de Alimentos', prerequisitos: ['Bioquímica Clínica'] },
      { nombre: 'Farmacia Clínica y Atención Farmacéutica II', prerequisitos: ['Farmacia Clínica y Atención Farmacéutica I'] },
      { nombre: 'Administración y Gestión en Salud' },
      { nombre: 'Integrador I: Lab. Químico, Clínico, Forense y Biofarmacéutico', prerequisitos: ['Tecnología Farmacéutica II'] }
    ]
  },
  {
    semestre: 'Semestre X',
    ramos: [
      { nombre: 'Ética y Legislación Farmacéutica' },
      { nombre: 'Farmacia Hospitalaria', prerequisitos: ['Farmacia Clínica y Atención Farmacéutica II'] },
      { nombre: 'Gestión de Recursos y Evaluación de Proyectos' },
      { nombre: 'Práctica en Farmacia Comunitaria', prerequisitos: ['Integrador I: Lab. Químico, Clínico, Forense y Biofarmacéutico'] },
      { nombre: 'Responsabilidad Social' },
      { nombre: 'Integrador II: Atención Clínica', prerequisitos: ['Farmacia Clínica y Atención Farmacéutica II'] }
    ]
  },
  {
    semestre: 'Semestre XI',
    ramos: [
      { nombre: 'Internado Farmacéutico', prerequisitos: ['Práctica en Farmacia Comunitaria'] }
    ]
  }
];

// Estado local para aprobados
let aprobados = JSON.parse(localStorage.getItem('aprobados')) || [];

const grid = document.getElementById('grid');

function estaBloqueado(ramo) {
  if (!ramo.prerequisitos) return false;
  return !ramo.prerequisitos.every(pr => aprobados.includes(pr));
}

function toggleRamo(nombre) {
  if (aprobados.includes(nombre)) {
    aprobados = aprobados.filter(r => r !== nombre);
  } else {
    aprobados.push(nombre);
  }
  localStorage.setItem('aprobados', JSON.stringify(aprobados));
  render();
}

function render() {
  grid.innerHTML = '';
  malla.forEach(sem => {
    const semDiv = document.createElement('div');
    semDiv.className = 'semestre';

    const title = document.createElement('h2');
    title.textContent = sem.semestre;
    semDiv.appendChild(title);

    sem.ramos.forEach(ramo => {
      const ramoDiv = document.createElement('div');
      ramoDiv.className = 'ramo';

      const bloqueado = estaBloqueado(ramo);
      const aprobado = aprobados.includes(ramo.nombre);

      if (bloqueado) {
        ramoDiv.classList.add('bloqueado');
        ramoDiv.title = 'Prerrequisitos: ' + ramo.prerequisitos.join(', ');
      } else if (aprobado) {
        ramoDiv.classList.add('aprobado');
      }

      ramoDiv.textContent = ramo.nombre;

      if (!bloqueado) {
        ramoDiv.style.cursor = 'pointer';
        ramoDiv.onclick = () => toggleRamo(ramo.nombre);
      }

      semDiv.appendChild(ramoDiv);
    });

    grid.appendChild(semDiv);
  });
}

render();


