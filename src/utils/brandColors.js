/**
 * Utilitaires pour gérer les couleurs selon la marque
 */

export const getBrandColors = (brand) => {
  const brandColors = {
    anais: {
      primary: 'anais-900',
      primaryHover: 'anais-800',
      primaryLight: 'anais-50',
      primaryMedium: 'anais-100',
      primaryDark: 'anais-950',
      text: 'anais-900',
      bg: 'anais-50',
      border: 'anais-200',
    },
    evolve: {
      primary: 'evolve-900',
      primaryHover: 'evolve-800',
      primaryLight: 'evolve-50',
      primaryMedium: 'evolve-100',
      primaryDark: 'evolve-950',
      text: 'evolve-900',
      bg: 'evolve-50',
      border: 'evolve-200',
    },
    populo: {
      primary: 'populo-900',
      primaryHover: 'populo-800',
      primaryLight: 'populo-50',
      primaryMedium: 'populo-100',
      primaryDark: 'populo-950',
      text: 'populo-900',
      bg: 'populo-50',
      border: 'populo-200',
    },
  };

  return brandColors[brand] || brandColors.anais; // Par défaut Anais
};

export const getBrandName = (brand) => {
  const brandNames = {
    anais: 'Anais',
    evolve: 'Evolve',
    populo: 'Populo',
  };

  return brandNames[brand] || 'Unknown';
};

export const getBrandVariant = (brand) => {
  const brandVariants = {
    anais: 'anais',
    evolve: 'evolve',
    populo: 'populo',
  };

  return brandVariants[brand] || 'anais';
};

// Classes CSS prêtes à utiliser
export const getBrandButtonClasses = (brand) => {
  const colors = getBrandColors(brand);
  return `bg-${colors.primary} hover:bg-${colors.primaryHover} text-white`;
};

export const getBrandLoadingClasses = (brand) => {
  const colors = getBrandColors(brand);
  return `border-${colors.primary}`;
};

export const getBrandTextClasses = (brand) => {
  const colors = getBrandColors(brand);
  return `text-${colors.text}`;
};

export const getBrandBgClasses = (brand) => {
  const colors = getBrandColors(brand);
  return `bg-${colors.bg}`;
};


