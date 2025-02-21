import express from 'express'
const app = express()
import cors from 'cors'
import 'express-async-errors'
import middleware from './util/middleware.js'
import { error as _error } from './util/logger.js'
import 'express-async-errors'

import assembliesRouter from './controllers/assemblies.js'
import assemblyMaterialsRouter from './controllers/assemblyMaterials.js'
import crateAssembliesRouter from './controllers/crateAssemblies.js'
import cratesRouter from './controllers/crates.js'
import crateStockRouter from './controllers/crateStock.js'
import manufacturersRouter from './controllers/manufacturers.js'
import materialsRouter from './controllers/materials.js'
import projectsRouter from './controllers/projects.js'
import receivedShipmentsRouter from './controllers/receivedShipments.js'
import sentShipmentsRouter from './controllers/sentShipments.js'
import shelfLocationsRouter from './controllers/shelfLocations.js'
import shipmentCratesRouter from './controllers/shipmentCrates.js'
import shipmentsRouter from './controllers/shipments.js'
import stagingAreasRouter from './controllers/stagingAreas.js'
import stockRouter from './controllers/stock.js'
import warehouseLocationsRouter from './controllers/warehouseLocations.js'

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/health', (req, res) => {
  res.send('ok')
})

app.use('/api/assemblies', assembliesRouter)
app.use('/api/assemblyMaterials', assemblyMaterialsRouter)
app.use('/api/crateAssemblies', crateAssembliesRouter)
app.use('/api/crates', cratesRouter)
app.use('/api/crateStock', crateStockRouter)
app.use('/api/manufacturers', manufacturersRouter)
app.use('/api/materials', materialsRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/receivedShipments', receivedShipmentsRouter)
app.use('/api/sentShipments', sentShipmentsRouter)
app.use('/api/shelfLocations', shelfLocationsRouter)
app.use('/api/shipmentCrates', shipmentCratesRouter)
app.use('/api/shipments', shipmentsRouter)
app.use('/api/stagingAreas', stagingAreasRouter)
app.use('/api/stock', stockRouter)
app.use('/api/warehouseLocations', warehouseLocationsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
