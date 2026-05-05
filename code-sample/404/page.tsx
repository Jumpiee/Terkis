export default function Page() {
  const iconStyle = {
    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  } as const

  const filledIconStyle = {
    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  } as const

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <header className="flex justify-between items-center w-full px-margin-md h-16 bg-background dark:bg-inverse-surface border-b border-on-surface dark:border-outline fixed top-0 z-50">
        <div className="flex items-center gap-8">
          <span className="font-headline-md text-headline-md font-black tracking-tighter text-primary dark:text-inverse-primary">
            SYS_KERNEL_v4.04
          </span>
          <nav className="hidden md:flex gap-6 items-center h-full">
            <a
              className="font-data-md text-data-md text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-tertiary-container transition-colors"
              href="#"
            >
              Diagnostic
            </a>
            <a
              className="font-data-md text-data-md text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-tertiary-container transition-colors"
              href="#"
            >
              Telemetry
            </a>
            <a
              className="font-data-md text-data-md text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-tertiary-container transition-colors"
              href="#"
            >
              Logs
            </a>
            <a
              className="font-data-md text-data-md text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-tertiary-container transition-colors"
              href="#"
            >
              Terminal
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary" style={iconStyle}>
            settings
          </span>
          <span className="material-symbols-outlined text-primary" style={iconStyle}>
            account_circle
          </span>
        </div>
      </header>

      <main className="pt-16 min-h-screen flex flex-col">
        <section className="relative border-b border-on-surface min-h-[70vh] flex flex-col md:flex-row items-stretch [background-image:radial-gradient(#333333_1px,transparent_1px)] [background-size:24px_24px]">
          <div className="flex-1 p-margin-lg flex flex-col justify-center border-r border-on-surface bg-white/80 backdrop-blur-sm relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary-container font-label-caps text-label-caps">
              <span
                className="material-symbols-outlined text-[14px]"
                style={filledIconStyle}
              >
                warning
              </span>
              SYSTEM_CONNECTION_FAILURE
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary mb-6 uppercase">
              ERROR_CODE_404:
              <br />
              POINT_OF_FAILURE_DETECTED
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-12">
              The requested coordinate or technical specification is currently unreachable within
              the primary grid. Connection integrity compromised.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-on-primary px-8 py-4 font-label-caps text-label-caps tracking-widest hover:bg-[#410000] active:border-inset transition-all duration-75">
                RE-ESTABLISH LINK
              </button>
              <button className="border border-primary text-primary px-8 py-4 font-label-caps text-label-caps tracking-widest hover:bg-surface-container transition-colors">
                ACCESS SYSTEM LOGS
              </button>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-on-surface pt-8">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-2 uppercase">
                  Node_Address
                </span>
                <span className="font-data-md text-data-md block text-primary">
                  0x00F4_CORE_GRID
                </span>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-2 uppercase">
                  Latency_Status
                </span>
                <span className="font-data-md text-data-md block text-primary">
                  TIMEOUT_INFINITE
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-inverse-surface relative overflow-hidden flex items-center justify-center p-margin-md">
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img
                alt=""
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/ADBb0uhO_HUiCD3FRy2Cy3grR0FkH6tGVqGVsj2OcstPK19NfvfXit6nYcDlwb5mRySJm8-epQ-AbWWYtSCEqjRVwx40gH63ICenk7BTkbAzE_GvOWBBrb2_A09syNbP_Xomr_CCKzM_9xovJtJyRZc0SBMOkVDX6IpDzkO7gP8NhU_E5Buo0zByzxCQooAIjNrNf7WlG6P7_HD7BypkC76N6HFdw8BT2oYqoq0fMlCpBU-n3X3ximx7_wiY5Ucvp36DTt8_HMrmsvLmtg"
              />
            </div>
            <div className="relative z-10 w-full max-w-lg aspect-square border border-error p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="font-data-md text-data-md text-error">[SCANNING_SECTOR_7]</span>
                <span
                  className="material-symbols-outlined text-error"
                  style={filledIconStyle}
                >
                  error_med
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 mb-6 relative">
                  <div className="absolute inset-0 border-2 border-error border-dashed animate-pulse" />
                  <img
                    alt=""
                    className="w-full h-full object-contain filter grayscale invert brightness-200"
                    src="https://lh3.googleusercontent.com/aida/ADBb0uifobBlowUPOsMGFoZbzFGAzJTYzPzjz5jOcxshlN4DJ2a48n05ht5GqoZhY_dX02YRYOmPYk3yfrmUq4zkgAwZ0r7LZ64iFW7i7rotK78lZvD7PnT9PcdvQ1v1JSDDzEwcZpOOay0ULckvDtmQFwTvDWIdaxwx5dGDSNGvb6W62owCDHlaqmdo8ynixcpmsddWgcxVBHf3Bkm_zBrkFTottpQTZ_w6OnbwFa4NQqCDWzXiFE3tSuv628p14ZSlkEL_kZWL78u2"
                  />
                </div>
                <span className="font-headline-md text-headline-md text-on-primary-container text-center px-4 py-2 bg-primary-container">
                  CONNECTION_LOST
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-label-caps text-label-caps text-on-primary-container">
                  STATUS: TERMINATED
                </span>
                <span className="font-data-md text-data-md text-on-primary-container">
                  NULL_PTR_EXCEPTION
                </span>
              </div>
            </div>
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-on-primary-container/30" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-on-primary-container/30" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-on-primary-container/30" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-on-primary-container/30" />
          </div>
        </section>

        <section className="bg-surface py-margin-lg px-margin-md flex-grow">
          <div className="mb-12 flex items-center gap-4">
            <div className="h-[1px] flex-grow bg-on-surface" />
            <h2 className="font-label-caps text-label-caps tracking-[0.2em] uppercase">
              Critical_System_Nodes
            </h2>
            <div className="h-[1px] flex-grow bg-on-surface" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-column-gap">
            <div className="border border-on-surface p-base hover:bg-surface-container-high transition-colors group cursor-pointer">
              <div className="bg-surface-container p-margin-sm mb-4 flex justify-between items-center border-b border-on-surface">
                <span className="font-label-caps text-label-caps uppercase">Sector_01</span>
                <span className="material-symbols-outlined text-primary" style={iconStyle}>
                  water_pump
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Pumping Systems</h3>
              <p className="font-body-md text-on-surface-variant mb-8">
                Integrated hydraulic propulsion modules and secondary flow controllers.
              </p>
              <div className="flex justify-between items-center font-data-md text-data-md text-primary">
                <span>ACCESS_MODULE</span>
                <span
                  className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                  style={iconStyle}
                >
                  arrow_forward
                </span>
              </div>
            </div>

            <div className="border border-on-surface p-base hover:bg-surface-container-high transition-colors group cursor-pointer">
              <div className="bg-surface-container p-margin-sm mb-4 flex justify-between items-center border-b border-on-surface">
                <span className="font-label-caps text-label-caps uppercase">Sector_02</span>
                <span className="material-symbols-outlined text-primary" style={iconStyle}>
                  speed
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Pressure Management</h3>
              <p className="font-body-md text-on-surface-variant mb-8">
                Atmospheric stabilization units and grid-wide pressure monitoring nodes.
              </p>
              <div className="flex justify-between items-center font-data-md text-data-md text-primary">
                <span>ACCESS_MODULE</span>
                <span
                  className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                  style={iconStyle}
                >
                  arrow_forward
                </span>
              </div>
            </div>

            <div className="border border-on-surface p-base hover:bg-surface-container-high transition-colors group cursor-pointer">
              <div className="bg-surface-container p-margin-sm mb-4 flex justify-between items-center border-b border-on-surface">
                <span className="font-label-caps text-label-caps uppercase">Sector_03</span>
                <span className="material-symbols-outlined text-primary" style={iconStyle}>
                  shield
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Sealing Solutions</h3>
              <p className="font-body-md text-on-surface-variant mb-8">
                Gasket integrity protocols and containment boundary specifications.
              </p>
              <div className="flex justify-between items-center font-data-md text-data-md text-primary">
                <span>ACCESS_MODULE</span>
                <span
                  className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                  style={iconStyle}
                >
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex justify-between items-center w-full px-margin-md py-4 border-t border-on-surface bg-background dark:bg-inverse-surface">
        <span className="font-label-caps text-label-caps text-on-surface uppercase">
          © 2024 INDUSTRIAL_KINETICS // CORE_OS_V4
        </span>
        <div className="flex gap-margin-md">
          <a
            className="font-data-md text-data-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors underline"
            href="#"
          >
            System_Map
          </a>
          <a
            className="font-data-md text-data-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Protocol_Docs
          </a>
          <a
            className="font-data-md text-data-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Support_Line
          </a>
        </div>
      </footer>
    </div>
  )
}
