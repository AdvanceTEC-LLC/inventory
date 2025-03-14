import express from 'express'
const app = express()
import cors from 'cors'
import 'express-async-errors'
import middleware from './util/middleware.js'
import { error as _error } from './util/logger.js'
import 'express-async-errors'

import assembliesRouter from './controllers/assemblies.js'
import assemblyCratesRouter from './controllers/assemblyCrates.js'
import assemblyMaterialsRouter from './controllers/assemblyMaterials.js'
import assemblyCrateAssembliesRouter from './controllers/assemblyCrateAssemblies.js'
import cratesRouter from './controllers/crates.js'
import crateLocationsRouter from './controllers/crateLocations.js'
import materialCrateStockRouter from './controllers/materialCrateStock.js'
import manufacturersRouter from './controllers/manufacturers.js'
import materialsRouter from './controllers/materials.js'
import materialCratesRouter from './controllers/materialCrates.js'
import projectsRouter from './controllers/projects.js'
import receivedShipmentsRouter from './controllers/receivedShipments.js'
import sentShipmentsRouter from './controllers/sentShipments.js'
import shelfLocationsRouter from './controllers/shelfLocations.js'
import shipmentsRouter from './controllers/shipments.js'
import stagingAreasRouter from './controllers/stagingAreas.js'
import stockRouter from './controllers/stock.js'

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/health', (req, res) => {
  res.send('ok')
})

app.use('/api/assemblies', assembliesRouter)
app.use('/api/assemblyCrates', assemblyCratesRouter)
app.use('/api/assemblyCrateAssemblies', assemblyCrateAssembliesRouter)
app.use('/api/assemblyMaterials', assemblyMaterialsRouter)
app.use('/api/crates', cratesRouter)
app.use('/api/crateLocations', crateLocationsRouter)
app.use('/api/materialCrateStock', materialCrateStockRouter)
app.use('/api/manufacturers', manufacturersRouter)
app.use('/api/materials', materialsRouter)
app.use('/api/materialCrates', materialCratesRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/receivedShipments', receivedShipmentsRouter)
app.use('/api/sentShipments', sentShipmentsRouter)
app.use('/api/shelfLocations', shelfLocationsRouter)
app.use('/api/shipments', shipmentsRouter)
app.use('/api/stagingAreas', stagingAreasRouter)
app.use('/api/stock', stockRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
