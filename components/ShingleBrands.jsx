// "Shingles we install" line with the Owens Corning link. OC's guidelines
// want the ® on the name and the independent-contractor note wherever the
// brand appears, so both travel together here.
export const OC_SHINGLES_URL = 'https://www.owenscorning.com/en-us/roofing/shingles';
const DISCLAIMER = 'Stellar Roofing & Restorations is an independent contractor and is not an affiliate of Owens Corning Roofing and Asphalt, LLC or its affiliated companies, or of GAF.';

export default function ShingleBrands({ dark = false, className = '' }) {
  const text = dark ? 'text-white/70' : 'text-text-muted';
  const link = dark ? 'text-white underline underline-offset-2 hover:text-white/80' : 'text-primary underline underline-offset-2 hover:text-primary-light';
  return (
    <div className={className}>
      <p className={`${text} text-sm`}>
        Shingles we install:{' '}
        <strong><a href={OC_SHINGLES_URL} target="_blank" rel="noopener" className={link}>Owens Corning®</a></strong>
        {' · '}<strong className={dark ? 'text-white' : 'text-primary'}>GAF</strong>
      </p>
      <p className={`${dark ? 'text-white/40' : 'text-text-muted/80'} text-xs mt-1`}>{DISCLAIMER}</p>
    </div>
  );
}
