import { createTaxAgent } from "../agent/agentFactory.js";
import { settleTax } from "../services/taxSettlementService.js";

export async function settleTaxHandler(req, res) {
  try {
    const { userAddress } = req.body;

    const agent = await createTaxAgent();
    const result = await settleTax(agent, userAddress);

    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
