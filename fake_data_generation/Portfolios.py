import numpy as np

class Portfolios:

	def __init__(self):
		self.portfolios = abs(np.random.randn(4))
		sum_ = sum(self.portfolios)
		for i in range(len(self.portfolios)):
			self.portfolios[i] = self.portfolios[i]/sum_

		self.portfolios_return = (np.random.randn(1)+3)/20*100