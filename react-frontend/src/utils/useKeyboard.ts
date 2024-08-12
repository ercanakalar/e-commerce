const useKeyboard = () => {
  const isMetaKey = (event: KeyboardEvent) => {
    return (
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey ||
      event.key === 'Tab' ||
      event.key === 'Enter' ||
      event.key === 'Backspace' ||
      event.key === 'Backspace' ||
      event.key === 'CapsLock' ||
      event.key === 'Escape' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'Delete'
    );
  };
  const allowCleanText = (e: KeyboardEvent) => {
    if (!e.metaKey && !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s\\/-_.,;%?*!'&:]*$/.test(e.key)) {
      e.preventDefault();
    }
  };
  const onlyAllowNumeric = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[0-9]*$/.test(e.key)) {
      e.preventDefault();
    }
  };
  const onlyAllowNumericDotted = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[0-9.]*$/.test(e.key)) {
      e.preventDefault();
    }
  };
  const turkishCharsetRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]$/;
  const onlyAllowAlpha = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !turkishCharsetRegex.test(e.key)) {
      e.preventDefault();
    }
  };
  const onlyAllowAlphaSpace = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyAllowAlphaNumeric = (e: KeyboardEvent) => {
    if (
      !isMetaKey(e) &&
      !turkishCharsetRegex.test(e.key) &&
      !/^[0-9]*$/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  const onlyAllowAlphaNumericSpace = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[a-zA-Z\sğüşıöçĞÜŞİÖÇ0-9]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyAllowAlphaNumericDot = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[a-zA-ZğüşıöçĞÜŞİÖÇ.0-9]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyAllowAlphaNumericSpaceDot = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[a-zA-Z\sğüşıöçĞÜŞİÖÇ.0-9]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyAllowEmail = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[a-zA-Z.0-9@_-]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyAllowPhone = (e: KeyboardEvent) => {
    if (!isMetaKey(e) && !/^[0-9\s()+]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyAllowMatch = (e: KeyboardEvent, match: RegExp) => {
    if (!isMetaKey(e) && !match.test(e.key)) {
      e.preventDefault();
    }
  };

  const dontAllowMatch = (e: KeyboardEvent, match: RegExp) => {
    if (!(!isMetaKey(e) && !match.test(e.key))) {
      e.preventDefault();
    }
  };

  return {
    dontAllowMatch,
    onlyAllowNumericDotted,
    onlyAllowAlphaSpace,
    onlyAllowNumeric,
    onlyAllowAlpha,
    onlyAllowAlphaNumeric,
    onlyAllowAlphaNumericSpace,
    onlyAllowAlphaNumericDot,
    onlyAllowEmail,
    onlyAllowPhone,
    onlyAllowMatch,
    onlyAllowAlphaNumericSpaceDot,
    allowCleanText,
  };
};

export { useKeyboard };
