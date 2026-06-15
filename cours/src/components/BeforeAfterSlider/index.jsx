import React from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from 'react-compare-slider';

/**
 * BeforeAfterSlider — a Docusaurus-ready before/after image comparison component.
 *
 * Usage in any .mdx file:
 *
 *   import BeforeAfterSlider from '@site/src/components/BeforeAfterSlider';
 *
 *   <BeforeAfterSlider
 *     before="/img/mise-en-forme-avant.png"
 *     after="/img/mise-en-forme-apres.png"
 *     beforeLabel="Avant"
 *     afterLabel="Après"
 *   />
 *
 * Props:
 *   before       {string}  Path to the "before" image (required)
 *   after        {string}  Path to the "after" image (required)
 *   beforeLabel  {string}  Label shown on the left side  (default: "Avant")
 *   afterLabel   {string}  Label shown on the right side (default: "Après")
 *   height       {string}  CSS height of the slider      (default: "500px")
 *   portrait     {boolean} Switch to vertical drag mode  (default: false)
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Avant',
  afterLabel = 'Après',
  height = '500px',
  portrait = false,
}) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <ReactCompareSlider
        portrait={portrait}
        position={50}
        style={{ height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backdropFilter: 'blur(4px)',
              background: 'white',
              border: '2px solid rgba(0,0,0,0.2)',
              color: '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}
            linesStyle={{ color: 'white', opacity: 0.85 }}
          />
        }
        itemOne={
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <ReactCompareSliderImage
              src={before}
              alt={beforeLabel}
              style={{ objectFit: 'cover' }}
            />
            <Label text={beforeLabel} side="left" />
          </div>
        }
        itemTwo={
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <ReactCompareSliderImage
              src={after}
              alt={afterLabel}
              style={{ objectFit: 'cover' }}
            />
            <Label text={afterLabel} side="right" />
          </div>
        }
      />
    </div>
  );
}

function Label({ text, side }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: '12px',
        ...(side === 'left' ? { left: '12px' } : { right: '12px' }),
        background: 'rgba(0, 0, 0, 0.55)',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: '4px',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {text}
    </span>
  );
}