package popz.solpop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PopUpStoreRaffle {

  @Id
  private String popUpStoreRaffleNo;
  private java.sql.Date popUpStoreRaffleStartDate;
  private java.sql.Date popUpStoreRaffleEndDate;
  private String popUpStoreRaffleQualification;
  private String popUpStoreRaffleDetail;
  private long popUpStoreRafflePrice;
  private String popUpStoreRafflePriceCnum;
  private long popUpStoreRaffleMaxWinners;
  private String popUpStoreNo;


}
